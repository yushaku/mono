import { Migration } from '@mikro-orm/migrations';

export class Migration20230622035347 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `CREATE TABLE "bot" (
        "id" uuid NOT NULL,
        "created_at" timestamptz(0) NOT NULL,
        "updated_at" timestamptz(0) NOT NULL,
        "team_id" uuid NOT NULL,
        "gpt_id" uuid NULL,
        "name" varchar(255) NOT NULL,
        "description" varchar(255) NULL,
        "model" varchar(255) NULL,
        "is_deleted" boolean NOT NULL DEFAULT false,
        "knowledge_base" jsonb NOT NULL,
        "relevance_score" varchar(255) NOT NULL DEFAULT \ 'Balanced\', constraint "bot_pkey" primary key ("id")
      );`,
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "bot" cascade;');
  }
}
