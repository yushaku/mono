import { EntityManager } from '@mikro-orm/core';
import { faker, Seeder } from '@mikro-orm/seeder';
import { UserEntity } from '../entities';
import * as uuid from 'uuid';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const TOTAL = 10;

    for (let i = 0; i < TOTAL; i++) {
      em.create(UserEntity, {
        id: uuid.v4(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.lorem.word(),
      });
    }
  }
}
