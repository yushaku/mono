import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/createChat.dto';
import { JwtUser } from '@/common/decorators';
import { JwtAuthGuard } from '@/common/guards';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TokenPayload } from 'types';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  async getAll(@JwtUser() { team_id }: TokenPayload) {
    this.chatsService.getAll(team_id);
  }

  @Post()
  async create(
    @JwtUser() { team_id }: TokenPayload,
    @Body() { title }: CreateChatDto,
  ) {
    this.chatsService.create({ team_id, title });
  }
}
