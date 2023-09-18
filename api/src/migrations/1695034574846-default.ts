import { MigrationInterface, QueryRunner } from "typeorm";

export class default1695034574846 implements MigrationInterface {
    name = 'default1695034574846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "name" text NOT NULL, "url" text NOT NULL, "product_id" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Product" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_e6a9e829e17fc47fc17d695af8e" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_e6a9e829e17fc47fc17d695af8e"`);
        await queryRunner.query(`ALTER TABLE "Product" ADD "image" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
