import { PrimaryKey, Property, UuidType } from '@mikro-orm/core';
import * as uuid from 'uuid';

export abstract class BaseEntity {
  @PrimaryKey({ type: UuidType })
  id: string = uuid.v4();

  @Property({ fieldName: 'created_at' })
  created_at?: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updated_at?: Date = new Date();
}
