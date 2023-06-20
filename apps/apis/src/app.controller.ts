import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppControler {
  @Get()
  ok() {
    return { message: 'ok! nestjs server up' };
  }
}
