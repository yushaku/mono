import { Migration } from '@mikro-orm/migrations';

export class Migration20230622034925 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `CREATE TABLE "users" (
        "id" uuid NOT NULL,
        "team_id" uuid NOT NULL,
        "created_at" timestamptz(0) NOT NULL,
        "updated_at" timestamptz(0) NOT NULL,
        "name" varchar(255) NULL,
        "email" varchar(255) NOT NULL,
        "avatar" varchar(255) NULL,
        "password" varchar(255) NOT NULL,
        "role" varchar(255) NOT NULL,
        "is_confirm_email" boolean NOT NULL DEFAULT false,
        CONSTRAINT "users_pkey" PRIMARY KEY ("id")
      );`,
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }
}
