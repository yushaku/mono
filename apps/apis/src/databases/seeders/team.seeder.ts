import { TeamEntity } from '../entities';
import { TEAM_ID } from './database.seeder';
import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class TeamSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(TeamEntity, {
      id: TEAM_ID,
      name: 'yu_team',
      vip_plan: 'Premium',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
