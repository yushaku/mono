import { ChatsService } from './chats.service';
import { CreateChatDto, UpdateChatDto } from './dto/createChat.dto';
import { JwtUser } from '@/common/decorators';
import { JwtAuthGuard } from '@/common/guards';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TokenPayload } from 'types';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('ask')
  async askStream(
    @Res() response: Response,
    @Query() { prompt, chat_id }: { prompt: string; chat_id: string },
  ) {
    const stream = await this.chatsService.askStream(prompt, chat_id);
    response.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'X-Accel-Buffering': 'no',
      'Transfer-Encoding': 'chunked',
    });
    stream.pipe(response);
  }

  @Get()
  async getAll(@JwtUser() { team_id }: TokenPayload) {
    return this.chatsService.getAll(team_id);
  }

  @Post()
  async create(
    @JwtUser() { team_id }: TokenPayload,
    @Body() { title }: CreateChatDto,
  ) {
    this.chatsService.create({ team_id, title });
  }

  @Patch()
  async updatetitle(@Body() chatDto: UpdateChatDto) {
    this.chatsService.updateTitle(chatDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.chatsService.delete(id);
  }
}
