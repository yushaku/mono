import { BaseEntity } from './base.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'teams' })
export class TeamEntity extends BaseEntity {
  @Property({ fieldName: 'name', type: String, nullable: true })
  name: string;

  @Property({ fieldName: 'vip_plan', type: String, nullable: false })
  vip_plan: SubscriptionPlan;

  @Property({ fieldName: 'stripe_customer_id', type: String, nullable: true })
  stripe_customer_id?: string;
}

export type SubscriptionPlan = 'Free' | 'Basic' | 'Premium';
export const subscriptionPrice = {
  Free: 0,
  Basic: 29,
  Premium: 49,
};
