import { Migration } from '@mikro-orm/migrations';

export class Migration20230323045617 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `CREATE TABLE "users" (
        "id" uuid NOT NULL,
        "name" varchar(255) NULL,
        "email" varchar(255) NOT NULL,
        "password" varchar(255) NOT NULL,

        "created_at" timestamptz(0) NOT NULL,
        "updated_at" timestamptz(0) NOT NULL,

        CONSTRAINT "company_pkey" PRIMARY KEY ("id")
      );`,
    );
  }
}
