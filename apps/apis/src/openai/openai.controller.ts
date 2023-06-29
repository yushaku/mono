import { CreateBotDto } from './dto/bot.dto';
import { OpenaiService } from './openai.service';
import { JwtUser } from '@/common/decorators';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TokenPayload } from 'types';

@Controller('bots')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get('listModel')
  listModel() {
    return this.openaiService.listModel();
  }

  @Get()
  getAll(@JwtUser() { team_id }: TokenPayload) {
    return this.openaiService.getAll(team_id);
  }

  @Post()
  create(@Body() data: CreateBotDto, @JwtUser() { team_id }: TokenPayload) {
    return this.openaiService.createBot({ ...data, team_id });
  }

  @Patch()
  update() {
    return;
  }

  @Delete()
  delete() {
    return;
  }
}
