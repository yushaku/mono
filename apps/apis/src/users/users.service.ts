import { CommonService } from '@/common/common.service';
import { UserEntity } from '@/databases/entities';
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
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: EntityRepository<UserEntity>,
    private common: CommonService,
  ) {}

  async login(userDto: UserDto) {
    const user = await this.getByEmail(userDto.email);
    if (!user) throw new NotFoundException("User's email does not exist");

    await this.verifyPassword(userDto.password, user.password);
    const accessToken = this.common.createAccessToken({
      userId: user.id,
    });

    return accessToken;
  }

  async googleAuth(user: CreateUserDto) {
    const existedUser = await this.getByEmail(user.email);
    if (!existedUser) return this.register(user);

    const accessToken = this.common.createAccessToken({
      userId: existedUser.id,
    });

    return accessToken;
  }

  async register(userDto: CreateUserDto) {
    const saltRounds = 10;

    const existedUser = await this.getByEmail(userDto.email);
    if (existedUser)
      throw new BadRequestException("email's user already existed");

    const hash = await bcrypt.hash(userDto.password, saltRounds);
    const user = await this.create({
      ...userDto,
      password: hash,
    });

    const accessToken = this.common.createAccessToken({
      userId: user.id,
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
    return this.usersRepository.findOne({ email });
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne(
      { id },
      { fields: ['name', 'email', 'createdAt', 'updatedAt'] },
    );
    if (!user) throw new NotFoundException("User's id does not exist");
    return user;
  }

  async create(user: CreateUserDto) {
    const userSchema = this.usersRepository.create(user);
    this.usersRepository.persistAndFlush(userSchema);
    return userSchema;
  }
}
