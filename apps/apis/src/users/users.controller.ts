import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto, UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { JwtUser } from '@/common/decorators';
import { GoogleOAuthGuard, JwtAuthGuard } from '@/common/guards';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
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
    const token = await this.usersService.googleAuth(user);

    this.setToken(res, token);
    res.redirect(this.config.get('CLIENT_URL') ?? 'http://localhost:3000');
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() userDto: Required<UserDto>,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(userDto);
    const token = await this.usersService.login(userDto);
    this.setToken(res, token);
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    await this.usersService.register(userDto);
    return { message: 'please confirm your email' };
  }

  protected setToken(res: Response, { access_token, refresh_token }) {
    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: this.isDevelopment ? 'lax' : 'strict',
      secure: this.isDevelopment ? false : true,
      path: '/',
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: this.isDevelopment ? 'lax' : 'strict',
      secure: this.isDevelopment ? false : true,
      path: '/',
    });
    res.status(200).json({ message: 'auth successfully', access_token });
  }

  @Get('confirm')
  async userConfirmInvite(
    @Query('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tk = await this.usersService.confirmInvite(token);
    this.setToken(res, tk);
    res.redirect(process.env.CLIENT_ENDPOINT ?? 'http://localhost:3000/');
  }

  @Get('verify')
  async verifyEmail(
    @Query('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tk = await this.usersService.verifyEmail(token);
    this.setToken(res, tk);
    res.redirect(process.env.CLIENT_ENDPOINT ?? 'http://localhost:3000/');
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token').send({ status: 'logout successfully' });
  }

  @Post('refresh')
  @HttpCode(200)
  async checkRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refresh_token = req.cookies?.refresh_token;
    const access_token = await this.usersService.checkRefreshToken(
      refresh_token,
    );
    this.setToken(res, { access_token, refresh_token });
    res.status(200).json({ access_token });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@JwtUser('user_id') id: string) {
    return this.usersService.getById(id);
  }

  @Patch('change_password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Body() data: UpdatePasswordDto,
    @JwtUser('user_id') id: string,
  ) {
    return this.usersService.updatePassword(id, data);
  }
}
