import { BaseEntity } from './base.entity';
import { Entity, Property, UuidType } from '@mikro-orm/core';

@Entity({ tableName: 'chats' })
export class ChatEntity extends BaseEntity {
  @Property({ fieldName: 'team_id', type: UuidType, nullable: false })
  team_id: string;

  @Property({ fieldName: 'title', type: String, nullable: true })
  title: string;

  @Property({ fieldName: 'is_pin', type: Boolean, default: false })
  is_pin?: boolean;
}
