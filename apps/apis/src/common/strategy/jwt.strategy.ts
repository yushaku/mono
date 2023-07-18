import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from 'types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const authorization = request.header('authorization') || '';
          let access_token = authorization.replace('Bearer ', '');

          if (!access_token) {
            access_token = request.cookies?.access_token;
          }
          return access_token;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ user_id, team_id }: TokenPayload) {
    const user = {
      user_id,
      team_id,
    };
    return user;
  }
}
