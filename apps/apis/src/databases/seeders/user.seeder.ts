import { UserEntity } from '../entities';
import { TEAM_ID } from './database.seeder';
import { EntityManager } from '@mikro-orm/core';
import { faker, Seeder } from '@mikro-orm/seeder';
import * as uuid from 'uuid';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const TOTAL = 10;

    for (let i = 0; i < TOTAL; i++) {
      em.create(UserEntity, {
        id: uuid.v4(),
        team_id: TEAM_ID,
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.lorem.word(),
        avatar: '',
        role: 'Owner',
        is_confirm_email: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
}
