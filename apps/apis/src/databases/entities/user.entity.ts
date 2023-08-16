import { BaseEntity } from './base.entity';
import { Entity, Property, Unique, UuidType } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class UserEntity extends BaseEntity {
  @Property({ fieldName: 'team_id', type: UuidType, nullable: true })
  team_id?: string;

  @Property({ fieldName: 'name', type: String, nullable: true })
  name: string;

  @Property({ fieldName: 'email', type: String, nullable: false })
  @Unique()
  email: string;

  @Property({ fieldName: 'avatar', type: String, nullable: true })
  avatar?: string;

  @Property({ fieldName: 'password', type: String, nullable: false })
  password: string;

  @Property({ fieldName: 'role', type: String, nullable: false })
  role: UserRole;

  @Property({ fieldName: 'is_confirm_email', type: Boolean, default: false })
  is_confirm_email?: boolean;
}

export type UserRole = 'Owner' | 'Member';
