import { Migration } from '@mikro-orm/migrations';

export class Migration20230622035814 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `CREATE TABLE "bot_knowledge" (
        "id" uuid NOT NULL,
        "created_at" timestamptz(0) NOT NULL,
        "updated_at" timestamptz(0) NOT NULL,
        "bot_id" uuid NOT NULL,
        "Knowledge_id" uuid NOT NULL,
        CONSTRAINT "bot_knowledge_pkey" PRIMARY KEY ("id")
      );`,
    );

    this.addSql(
      ` CREATE TABLE "content" (
        "id" uuid NOT NULL,
        "created_at" timestamptz(0) NOT NULL,
        "updated_at" timestamptz(0) NOT NULL,
        "team_id" uuid NOT NULL,
        "title" varchar(255) NULL,
        "category" varchar(255) NULL,
        "type" varchar(255) NULL,
        "is_trained" boolean NOT NULL DEFAULT false,
        "file_link" varchar(255) NULL,
        "text" varchar(255) NULL,
        CONSTRAINT "content_pkey" PRIMARY KEY ("id")
      ); `,
    );

    this.addSql(
      `CREATE TABLE "knowledge" (
        "id" uuid NOT NULL,
        "created_at" timestamptz(0) NOT NULL,
        "updated_at" timestamptz(0) NOT NULL,
        "team_id" uuid NOT NULL,
        "title" varchar(255) NULL,
        CONSTRAINT "knowledge_pkey" PRIMARY KEY ("id")
      );`,
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "bot_knowledge" cascade;');

    this.addSql('drop table if exists "content" cascade;');

    this.addSql('drop table if exists "knowledge" cascade;');
  }
}
