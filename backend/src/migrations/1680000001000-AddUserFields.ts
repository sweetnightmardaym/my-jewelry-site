import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserFields1680000001000 implements MigrationInterface {
  name = 'AddUserFields1680000001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying`);
    await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
  }
}
