import { Migration } from '@mikro-orm/migrations';

export class Migration20230831091636 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "teams" add column "stripe_customer_id" varchar(255) null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "teams" drop column "stripe_customer_id";');
  }
}
