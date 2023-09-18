import { MigrationInterface, QueryRunner } from "typeorm";

export class default1695035034988 implements MigrationInterface {
    name = 'default1695035034988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_e6a9e829e17fc47fc17d695af8e"`);
        await queryRunner.query(`ALTER TABLE "image" RENAME COLUMN "product_id" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_c6eb61588205e25a848ba6105cd" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_c6eb61588205e25a848ba6105cd"`);
        await queryRunner.query(`ALTER TABLE "image" RENAME COLUMN "productId" TO "product_id"`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_e6a9e829e17fc47fc17d695af8e" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
