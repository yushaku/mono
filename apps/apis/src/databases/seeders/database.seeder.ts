import { KnowledgeSeeder } from './knowledge.seeder';
import { TeamSeeder } from './team.seeder';
import { UserSeeder } from './user.seeder';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export const TEAM_ID = '9263ffae-6ff4-47e1-9e86-5f41845d416d';
export const KNOWLEDGE_ID = 'a5712621-7cae-4278-a548-a67461d79d2d';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [UserSeeder, TeamSeeder, KnowledgeSeeder]);
  }
}
