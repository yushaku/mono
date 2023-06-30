import { BaseEntity } from './base.entity';
import { Entity, Property, TextType, UuidType } from '@mikro-orm/core';

@Entity({ tableName: 'message' })
export class MessageEntity extends BaseEntity {
  @Property({ fieldName: 'chat_id', type: UuidType, nullable: false })
  chat_id: string;

  @Property({ fieldName: 'question', type: String, nullable: true })
  question: string;

  @Property({ fieldName: 'bot_answer', type: TextType, nullable: true })
  bot_answer: string;

  @Property({ fieldName: 'feed_back', type: String, nullable: true })
  feed_back: 'star' | 'like' | 'dislike';
}
