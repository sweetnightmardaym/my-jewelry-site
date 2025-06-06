import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1680000000000 implements MigrationInterface {
  name = 'Initial1680000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "role" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "nameRu" character varying NOT NULL, "nameUa" character varying NOT NULL, "nameEn" character varying NOT NULL, "parentId" integer, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "nameRu" character varying NOT NULL, "nameUa" character varying NOT NULL, "nameEn" character varying NOT NULL, "price" numeric NOT NULL, "currency" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_a5d97674bffb3022825df3334f4" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_category_parent" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_product_category" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_product_category"`);
    await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_category_parent"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
