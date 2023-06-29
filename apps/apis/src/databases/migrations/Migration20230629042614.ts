import { Migration } from '@mikro-orm/migrations';

export class Migration20230629042614 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "content" alter column "text" type text using ("text"::text);',
    );

    this.addSql('alter table "users" alter column "team_id" drop default;');
    this.addSql(
      'alter table "users" alter column "team_id" type uuid using ("team_id"::text::uuid);',
    );
    this.addSql('alter table "users" alter column "team_id" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "content" alter column "text" type varchar(255) using ("text"::varchar(255));',
    );

    this.addSql('alter table "users" alter column "team_id" drop default;');
    this.addSql(
      'alter table "users" alter column "team_id" type uuid using ("team_id"::text::uuid);',
    );
    this.addSql('alter table "users" alter column "team_id" set not null;');
  }
}
