import { BaseEntity } from './base.entity';
import { Entity, Property, UuidType } from '@mikro-orm/core';

@Entity({ tableName: 'bot' })
export class BotEntity extends BaseEntity {
  @Property({ fieldName: 'team_id', type: UuidType, nullable: false })
  team_id: string;

  @Property({ fieldName: 'gpt_id', type: UuidType, nullable: true })
  gpt_id: string;

  @Property({ fieldName: 'name', type: String, nullable: false })
  name: string;

  @Property({ fieldName: 'description', type: String, nullable: true })
  description: string;

  @Property({ fieldName: 'model', type: String, nullable: true })
  model: 'GPT-3.5-TURBO' | 'GPT-4';

  @Property({ fieldName: 'is_deleted', type: Boolean, default: false })
  is_deleted: boolean;

  @Property({ fieldName: 'knowledge_base', type: Object, nullable: false })
  knowledge_base: Array<string>;

  @Property({ fieldName: 'relevance_score', type: String, default: 'Balanced' })
  relevance_score: 'Factual' | 'Balanced' | 'Creative';
}
