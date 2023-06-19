import { BaseEntity } from './base.entity';
import { Entity, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class UserEntity extends BaseEntity {
  @Property({ fieldName: 'name', type: String, nullable: true })
  name: string;

  @Property({ fieldName: 'email', type: String, nullable: false })
  @Unique()
  email: string;

  @Property({ fieldName: 'password', type: String, nullable: false })
  password: string;
}
