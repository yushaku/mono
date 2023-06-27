import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { ChatsModule } from '@/chats/chats.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ChatsModule],
  controllers: [OpenaiController],
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
