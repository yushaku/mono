import { BulkExecService } from './bulkExcute';
import { CreateChatDto, UpdateChatDto } from './dto/createChat.dto';
import { ChatEntity, MessageEntity } from '@/databases/entities';
import { EntityRepository as ER } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatsService {
  private bulkExecService = new BulkExecService<MessageEntity>(
    Number(this.config.get('INSERT_GROUP_SIZE')) || 1000,
    Number(this.config.get('INSERT_GROUP_TIMEOUT')) || 1000,
    (items: any[]) => {
      this.bulkAddMessages(items);
    },
  );

  constructor(
    @InjectRepository(ChatEntity) private chatRepo: ER<ChatEntity>,
    private em: EntityManager,
    private config: ConfigService,
  ) {}

  async getAll(team_id: string) {
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

  async updateTitle(chatDto: UpdateChatDto) {
    const query = this.em.createQueryBuilder(ChatEntity);
    return query
      .update({ title: chatDto.title })
      .where({ id: chatDto.id })
      .execute('run');
  }

  async delete(id: string) {
    const query = this.em.createQueryBuilder(ChatEntity);
    return query.delete().where({ id }).execute('run');
  }

  async pushQueue(item: MessageEntity) {
    return this.bulkExecService.push(item);
  }

  async bulkAddMessages(data: any) {
    console.log(data);
  }
}
