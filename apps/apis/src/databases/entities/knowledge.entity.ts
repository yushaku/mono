import { BaseEntity } from './base.entity';
import { Entity, Property, UuidType } from '@mikro-orm/core';

@Entity({ tableName: 'knowledge' })
export class KnowledgeEntity extends BaseEntity {
  @Property({ fieldName: 'team_id', type: UuidType, nullable: false })
  team_id: string;

  @Property({ fieldName: 'title', type: String, nullable: true })
  title: string;
}
