import { Seeder } from '@mikro-orm/seeder';

import type { EntityManager } from '@mikro-orm/core';
import { UserSeeder } from './user.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [UserSeeder]);
  }
}
