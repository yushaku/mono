import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatEntity, MessageEntity } from '@/databases/entities';
import { OpenaiModule } from '@/openai/openai.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    OpenaiModule,
    MikroOrmModule.forFeature([ChatEntity, MessageEntity]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
