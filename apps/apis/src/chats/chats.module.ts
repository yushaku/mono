import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatEntity } from '@/databases/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature([ChatEntity])],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
