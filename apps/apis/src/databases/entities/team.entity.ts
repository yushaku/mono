import { BaseEntity } from './base.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'teams' })
export class TeamEntity extends BaseEntity {
  @Property({ fieldName: 'name', type: String, nullable: true })
  name: string;

  @Property({ fieldName: 'vip_plan', type: String, nullable: false })
  vip_plan: 'Free' | 'Basic' | 'Premium';
}
