import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'types';

@Injectable({ scope: Scope.REQUEST })
export class CommonService {
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
}
