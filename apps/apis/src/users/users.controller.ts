import { CreateUserDto } from './dto/createUser.dto';
import { InviteUserDto } from './dto/inviteUser.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { JwtUser } from '@/common/decorators';
import { GoogleOAuthGuard, JwtAuthGuard } from '@/common/guards';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { RequestWithUser } from 'types';

@Controller('user')
export class UsersController {
  private isDevelopment: boolean;

  constructor(
    private usersService: UsersService,
    private config: ConfigService,
  ) {
    this.isDevelopment =
      this.config.get('NODE_ENV') === 'development' ? true : false;
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  googleLogin() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = req.user as CreateUserDto;
    const access_token = await this.usersService.googleAuth(user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: this.isDevelopment ? 'lax' : 'strict',
      secure: this.isDevelopment ? false : true,
      expires: new Date(Date.now() + 30 * 60 * 1000),
    });
    res.redirect(this.config.get('CLIENT_URL') ?? 'http://localhost:3000');
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() userDto: Required<UserDto>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.usersService.login(userDto);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: this.isDevelopment ? 'lax' : 'strict',
      secure: this.isDevelopment ? false : true,
      expires: new Date(Date.now() + 30 * 60 * 1000),
      path: '/',
    });
    res.status(200).json({ access_token });
  }

  @Post('register')
  async register(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.usersService.register(userDto);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: this.isDevelopment ? 'none' : 'strict',
      secure: this.isDevelopment ? false : true,
      expires: new Date(Date.now() + 30 * 60 * 1000),
      path: '/',
    });
    res.status(200).json({ access_token });
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token').send({ status: 'logout successfully' });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@JwtUser('user_id') id: string) {
    const user = await this.usersService.getById(id);
    return user;
  }

  @Post('invite')
  async inviteUser(
    @JwtUser('team_id') team_id: string,
    @Body() users: InviteUserDto[],
  ) {
    return this.usersService.inviteUser({
      team_id,
      users,
    });
  }
}
