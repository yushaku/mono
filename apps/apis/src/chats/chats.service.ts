import { CreateChatDto } from './dto/createChat.dto';
import { ChatEntity } from '@/databases/entities';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepo: EntityRepository<ChatEntity>,
  ) {}

  getAll(team_id: string) {
    return this.chatRepo.find({ team_id });
  }

  create(chatDto: CreateChatDto & { team_id: string }) {
    return this.chatRepo.create(chatDto);
  }
}
