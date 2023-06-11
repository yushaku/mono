import * as uuid from 'uuid';
import { PrimaryKey, Property, UuidType } from '@mikro-orm/core';

export abstract class BaseEntity {
  @PrimaryKey({ type: UuidType })
  id: string = uuid.v4();

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
