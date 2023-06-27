import { CreateUserDto } from './dto/createUser.dto';
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

    // res.cookie('access_token', access_token, {
    //   httpOnly: true,
    //   sameSite: this.isDevelopment ? 'lax' : 'strict',
    //   secure: this.isDevelopment ? false : true,
    //   expires: new Date(Date.now() + 30 * 60 * 1000),
    // });
    // res.redirect(this.config.get('CLIENT_URL') ?? 'http://localhost:3000');
    return { access_token };
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() userDto: Required<UserDto>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.usersService.login(userDto);

    return { access_token };
  }

  @Post('register')
  async register(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.usersService.register(userDto);

    return { access_token };
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
}
