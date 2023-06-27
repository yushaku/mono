import { CreateUserDto } from './dto/createUser.dto';
import { InviteUserDto } from './dto/inviteUser.dto';
import { UserDto } from './dto/user.dto';
import { CommonService } from '@/common/common.service';
import { TeamEntity, UserEntity } from '@/databases/entities';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepo: EntityRepository<UserEntity>,
    @InjectRepository(TeamEntity)
    private teamRepo: EntityRepository<TeamEntity>,
    private common: CommonService,
  ) {}

  async login(userDto: Required<UserDto>) {
    const user = await this.getByEmail(userDto.email);
    if (!user) throw new NotFoundException("User's email does not exist");

    await this.verifyPassword(userDto.password, user.password);
    const accessToken = this.common.createAccessToken({
      user_id: user.id,
      team_id: user.team_id ?? '',
    });

    return accessToken;
  }

  async googleAuth(user: CreateUserDto) {
    const existedUser = await this.getByEmail(user.email);
    if (!existedUser) return this.register(user);

    const accessToken = this.common.createAccessToken({
      user_id: existedUser.id,
      team_id: existedUser.team_id ?? '',
    });

    return accessToken;
  }

  async register(userDto: CreateUserDto) {
    const saltRounds = 10;

    const existedUser = await this.getByEmail(userDto.email);
    if (existedUser)
      throw new BadRequestException("email's user already existed");

    const hash = await bcrypt.hash(userDto.password, saltRounds);
    const team_id = await this.createTeam({ name: userDto.name });

    const user = await this.create({
      ...userDto,
      team_id,
      password: hash,
    });

    const accessToken = this.common.createAccessToken({
      user_id: user.id,
      team_id: user.team_id ?? '',
    });
    return accessToken;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
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
      { fields: ['name', 'email', 'createdAt', 'updatedAt'] },
    );
    if (!user) throw new NotFoundException("User's id does not exist");
    return user;
  }

  async create(user: CreateUserDto & { team_id: string }) {
    const userSchema = this.usersRepo.create({
      ...user,
      role: 'Owner',
    });
    await this.usersRepo.persistAndFlush(userSchema);
    return userSchema;
  }

  async inviteUser(userDto: { team_id: string; users: InviteUserDto[] }) {
    return;
  }

  async createTeam({ name }: { name: string }) {
    const team = this.teamRepo.create({ name, vip_plan: 'Free' });
    await this.teamRepo.persistAndFlush(team);
    return team.id;
  }
}
