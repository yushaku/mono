import { UserEntity } from '../entities';
import { TEAM_ID } from './database.seeder';
import { EntityManager } from '@mikro-orm/core';
import { faker, Seeder } from '@mikro-orm/seeder';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const TOTAL = 5;

    const hash = await bcrypt.hash('Password123!@#', 10);

    em.create(UserEntity, {
      id: uuid.v4(),
      team_id: TEAM_ID,
      name: 'yushaku',
      email: 'son.lv@zinza.com.vn',
      password: hash,
      avatar: '',
      role: 'Owner',
      is_confirm_email: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    for (let i = 0; i < TOTAL; i++) {
      em.create(UserEntity, {
        id: uuid.v4(),
        team_id: TEAM_ID,
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.lorem.word(),
        avatar: '',
        role: 'Member',
        is_confirm_email: true,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
  }
}
