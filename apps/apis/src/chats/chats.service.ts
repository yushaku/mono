import { BulkExecService } from './bulkExcute';
import { CreateChatDto, UpdateChatDto } from './dto/createChat.dto';
import { ChatEntity, MessageEntity } from '@/databases/entities';
import { OpenaiService } from '@/openai/openai.service';
import { EntityRepository as ER } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from 'types';

@Injectable()
export class ChatsService implements OnModuleDestroy {
  private bulkExecService = new BulkExecService<MessageEntity>(
    Number(this.config.get('INSERT_GROUP_SIZE')) || 1000,
    Number(this.config.get('INSERT_GROUP_TIMEOUT')) || 1000,
    (items: MessageEntity[]) => {
      this.bulkAddMessages(items);
    },
  );

  constructor(
    @InjectRepository(ChatEntity) private chatRepo: ER<ChatEntity>,
    @InjectRepository(MessageEntity) private messageRepo: ER<MessageEntity>,
    private em: EntityManager,
    private openaiService: OpenaiService,
    private config: ConfigService,
  ) {}

  onModuleDestroy() {
    this.bulkExecService
      .flush()
      .then(() => {
        console.log(`EventService onModuleDestroy `);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getAll(team_id: string) {
    return this.chatRepo.find(
      { team_id },
      {
        fields: ['title', 'is_pin', 'created_at'],
        orderBy: { created_at: 'DESC' },
      },
    );
  }

  async askStream(prompt: string, chat_id: string) {
    let result = '';
    const stream = await this.openaiService.askStream(prompt);

    stream.on('data', (chunk) => {
      const value = new TextDecoder('utf-8').decode(chunk);
      const lines = value
        .toString()
        .split('\n')
        .filter((line: any) => line.trim() !== '');
      for (const line of lines) {
        const message = line.replace(/^data: /, '');
        if (message === '[DONE]') {
          return;
        }
        try {
          const parsed = JSON.parse(message);
          const word = parsed.choices[0].delta.content;
          result += word;
        } catch (error) {
          console.error('Error parsing AI response:', error);
        }
      }
    });
    stream.on('end', () => {
      this.pushMessage({
        chat_id,
        question: prompt,
        bot_answer: result,
      });
    });

    return stream;
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

  async pushMessage(data: Message) {
    const message = new MessageEntity();
    message.chat_id = data.chat_id;
    message.question = data.question;
    message.bot_answer = data.bot_answer;

    this.bulkExecService.push(message);
  }

  async bulkAddMessages(messages: MessageEntity[]) {
    const query = this.em.createQueryBuilder(MessageEntity);
    await query.insert(messages).onConflict('id').ignore().execute('run');
  }

  async getMessages(chat_id: string) {
    return this.messageRepo.find(
      { chat_id },
      {
        orderBy: { created_at: 'DESC' },
        fields: ['question', 'bot_answer', 'created_at', 'updated_at'],
      },
    );
  }
}
