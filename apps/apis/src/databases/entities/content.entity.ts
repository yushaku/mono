import { BaseEntity } from './base.entity';
import { Entity, TextType, Property, UuidType } from '@mikro-orm/core';
import { ActionType } from 'types';

@Entity({ tableName: 'content' })
export class ContentEntity extends BaseEntity {
  @Property({ fieldName: 'team_id', type: UuidType, nullable: false })
  knowledge_id: string;

  @Property({ fieldName: 'title', type: String, nullable: true })
  title: string;

  @Property({ fieldName: 'category', type: String, nullable: true })
  category?: string;

  @Property({ fieldName: 'type', type: String, nullable: true })
  type: ActionType;

  @Property({ fieldName: 'is_trained', type: Boolean, default: false })
  is_trained?: boolean;

  @Property({ fieldName: 'file_link', type: String, nullable: true })
  file_link: string;

  @Property({ fieldName: 'text', type: TextType, nullable: true })
  text?: string;
}
