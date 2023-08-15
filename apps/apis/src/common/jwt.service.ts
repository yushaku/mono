import { Invitetoken } from '@/users/dto/inviteUser.dto';
import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'types';

@Injectable({ scope: Scope.REQUEST })
export class JWTService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public createAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRED_TIME'),
    });
  }

  public createRefreshToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('REFRESH_EXPIRED_TIME'),
    });
  }

  public genToken(payload: TokenPayload) {
    return {
      access_token: this.createAccessToken(payload),
      refresh_token: this.createRefreshToken(payload),
    };
  }

  public async veryfyReFreshToken(refresh_token: string) {
    const payload: TokenPayload = await this.jwtService.verifyAsync(
      refresh_token,
      {
        secret: this.configService.get('JWT_SECRET'),
      },
    );
    return this.createAccessToken(payload);
  }

  public inviteToken(payload: Invitetoken) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: 60 * 5 * 1000,
    });
  }

  public async verifyInviteToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return payload as Invitetoken;
  }
}
