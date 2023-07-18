import { Migration } from '@mikro-orm/migrations';

export class Migration20230630071254 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "message" alter column "bot_answer" type text using ("bot_answer"::text);',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "message" alter column "bot_answer" type varchar(255) using ("bot_answer"::varchar(255));',
    );
  }
}
