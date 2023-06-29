import { KnowledgeEntity } from '../entities';
import { KNOWLEDGE_ID, TEAM_ID } from './database.seeder';
import { EntityManager } from '@mikro-orm/core';
import { Seeder, faker } from '@mikro-orm/seeder';

export class KnowledgeSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(KnowledgeEntity, {
      id: KNOWLEDGE_ID,
      team_id: TEAM_ID,
      title: faker.name.fullName(),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}
