import { CreateUserDto } from './dto/createUser.dto';
import { inviteUserPayload } from './dto/inviteUser.dto';
import { UpdatePasswordDto, UserDto } from './dto/user.dto';
import { JWTService } from '@/common/jwt.service';
import { TeamEntity, UserEntity, UserRole } from '@/databases/entities';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Queue } from 'bull';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepo: EntityRepository<UserEntity>,
    @InjectRepository(TeamEntity)
    private teamRepo: EntityRepository<TeamEntity>,
    @InjectQueue('email') private emailQueue: Queue,
    private common: JWTService,
  ) {}

  async login(userDto: Required<UserDto>) {
    const user = await this.getByEmail(userDto.email);
    if (!user) throw new NotFoundException("User's email does not exist");

    await this.verifyPassword(userDto.password, user.password);
    const token = this.common.genToken({
      user_id: user.id,
      team_id: user.team_id ?? '',
    });

    return token;
  }

  async checkRefreshToken(refresh_token: string) {
    return this.common.veryfyReFreshToken(refresh_token);
  }

  async googleAuth(user: CreateUserDto) {
    const existedUser = await this.getByEmail(user.email);
    if (!existedUser) return this.createAccount(user);

    const token = this.common.genToken({
      user_id: existedUser.id,
      team_id: existedUser.team_id ?? '',
    });

    return token;
  }

  async register({ team_id, email, password }: CreateUserDto) {
    const existedUser = await this.getByEmail(email);
    if (existedUser)
      throw new BadRequestException("email's user already existed");

    const token = this.common.emailToken({ team_id, email, password });
    this.emailQueue.add('sendVerifyEmail', { email, token, password });
  }

  async verifyEmail(token: string) {
    let role: UserRole = 'Member';
    let {
      email,
      team_id,
      password,
      name = '',
    } = await this.common.verifyEmailToken(token);

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    if (!team_id) {
      team_id = await this.createTeam({ name });
      role = 'Owner';
    }

    const user = await this.create({
      email,
      team_id,
      name,
      role,
      password: hash,
    });

    return this.common.genToken({
      user_id: user.id,
      team_id: user.team_id!,
    });
  }

  async confirmInvite(token: string) {
    const { email, team_id, password } = await this.common.verifyEmailToken(
      token,
    );
    const existedUser = await this.getByEmail(email);
    if (!existedUser)
      return this.createAccount({
        team_id,
        email,
        password,
        name: email.split('@')[0],
      });

    return this.common.genToken({
      user_id: existedUser.id,
      team_id: existedUser.team_id ?? team_id ?? '',
    });
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getByEmail(email: string) {
    return this.usersRepo.findOne({ email });
  }

  async getById(id: string) {
    const user = await this.usersRepo.findOne(
      { id },
      { fields: ['name', 'email', 'avatar', 'created_at', 'updated_at'] },
    );
    if (!user) throw new NotFoundException("User's id does not exist");
    return user;
  }

  async createAccount(userDto: CreateUserDto) {
    const saltRounds = 10;
    let team_id = userDto.team_id ?? '';

    const existedUser = await this.getByEmail(userDto.email);
    if (existedUser)
      throw new BadRequestException("email's user already existed");

    const hash = await bcrypt.hash(userDto.password, saltRounds);

    if (!userDto?.team_id) {
      team_id = await this.createTeam({ name: userDto.name });
    }

    const user = await this.create({
      ...userDto,
      team_id,
      password: hash,
    });

    const token = this.common.genToken({
      user_id: user.id,
      team_id: user.team_id ?? '',
    });
    return token;
  }

  async create({
    role = 'Member',
    ...user
  }: CreateUserDto & { team_id: string; role?: UserRole }) {
    const userSchema = this.usersRepo.create({ ...user, role });
    await this.usersRepo.persistAndFlush(userSchema);
    return userSchema;
  }

  async inviteUser({ team_id, users }: inviteUserPayload) {
    users.emails.forEach((email) => {
      const password = uuid.v4();
      const token = this.common.emailToken({
        team_id,
        email,
        password,
      });
      this.emailQueue.add('sendConfirmEmail', { email, token, password });
    });
  }

  async createTeam({ name }: { name: string }) {
    const team = this.teamRepo.create({ name, vip_plan: 'Free' });
    await this.teamRepo.persistAndFlush(team);
    return team.id;
  }

  async getTeamMember(team_id: string) {
    return this.usersRepo.find(
      { team_id },
      { fields: ['avatar', 'name', 'created_at', 'role', 'updated_at'] },
    );
  }

  async updatePassword(id: string, data: UpdatePasswordDto) {
    const saltRounds = 10;
    const user = (await this.usersRepo.findOne({ id })) as { password: string };

    await this.verifyPassword(data.oldPassword, user.password);
    const hash = await bcrypt.hash(data.newPassword, saltRounds);

    wrap(user).assign({ password: hash });
    await this.teamRepo.persistAndFlush(user);
    return { message: 'update password successfully' };
  }
}
