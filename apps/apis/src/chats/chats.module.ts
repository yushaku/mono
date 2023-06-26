import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
