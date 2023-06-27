import { CreateChatDto, UpdateChatDto } from './dto/createChat.dto';
import { ChatEntity } from '@/databases/entities';
import { EntityRepository as ER } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatEntity) private chatRepo: ER<ChatEntity>,
    private em: EntityManager,
  ) {}

  getAll(team_id: string) {
    return this.chatRepo.find(
      { team_id },
      {
        fields: ['title', 'is_pin', 'createdAt'],
        orderBy: { createdAt: 'DESC' },
      },
    );
  }

  async create(chatDto: CreateChatDto & { team_id: string }) {
    const chat = this.chatRepo.create(chatDto);
    await this.chatRepo.persistAndFlush(chat);
    return chat;
  }

  updateTitle(chatDto: UpdateChatDto) {
    const query = this.em.createQueryBuilder(ChatEntity);
    return query
      .update({ title: chatDto.title })
      .where({ id: chatDto.id })
      .execute('run');
  }

  delete(id: string) {
    const query = this.em.createQueryBuilder(ChatEntity);
    return query.delete().where({ id }).execute('run');
  }
}
