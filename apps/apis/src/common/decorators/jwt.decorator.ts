import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from 'types';

export const JwtUser = createParamDecorator(
  (key: keyof TokenPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as TokenPayload;
    return key ? user?.[key] : user;
  },
);
