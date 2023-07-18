import { BaseEntity } from './base.entity';
import { Entity, Property, UuidType } from '@mikro-orm/core';

@Entity({ tableName: 'bot_knowledge' })
export class BotKnowledgeEntity extends BaseEntity {
  @Property({ fieldName: 'bot_id', type: UuidType, nullable: false })
  team_id: string;

  @Property({ fieldName: 'Knowledge_id', type: UuidType, nullable: false })
  Knowledge_id: string;
}
