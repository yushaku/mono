import { Migration } from '@mikro-orm/migrations';

export class Migration20230622035210 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      ` CREATE TABLE "teams" (
        "id" uuid NOT NULL,
        "name" varchar(255) NULL,
        "vip_plan" varchar(255) NOT NULL,
        "created_at" timestamptz(0) NOT NULL,
        "updated_at" timestamptz(0) NOT NULL,
        CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
      );`,
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "teams" cascade;');
  }
}
