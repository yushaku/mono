import { BaseEntity } from './base.entity';
import { Entity, Property, UuidType } from '@mikro-orm/core';

@Entity({ tableName: 'content' })
export class ContentEntity extends BaseEntity {
  @Property({ fieldName: 'team_id', type: UuidType, nullable: false })
  knowledge_id: string;

  @Property({ fieldName: 'title', type: String, nullable: true })
  title: string;

  @Property({ fieldName: 'category', type: String, nullable: true })
  category: string;

  @Property({ fieldName: 'type', type: String, nullable: true })
  type: 'FILE' | 'TEXT' | 'WEBSITE';

  @Property({ fieldName: 'is_trained', type: Boolean, default: false })
  is_trained: boolean;

  @Property({ fieldName: 'file_link', type: String, nullable: true })
  file_link: string;

  @Property({ fieldName: 'text', type: String, nullable: true })
  text: string;
}
