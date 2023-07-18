import { Migration } from '@mikro-orm/migrations';

export class Migration20230622035537 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `CREATE TABLE "chats" (
        "id" uuid NOT NULL,
        "created_at" timestamptz(0) NOT NULL,
        "updated_at" timestamptz(0) NOT NULL,
        "team_id" uuid NOT NULL,
        "title" varchar(255) NULL,
        "is_pin" boolean NOT NULL DEFAULT false,
        CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
    );`,
    );

    this.addSql(`
      CREATE TABLE "message" (
        "id" uuid NOT NULL,
        "created_at" timestamptz(0) NOT NULL,
        "updated_at" timestamptz(0) NOT NULL,
        "chat_id" uuid NOT NULL,
        "question" varchar(255) NULL,
        "bot_answer" varchar(255) NULL,
        "feed_back" varchar(255) NULL,
        CONSTRAINT "message_pkey" PRIMARY KEY ("id")
      );`);
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "chats" cascade;');

    this.addSql('drop table if exists "message" cascade;');
  }
}
