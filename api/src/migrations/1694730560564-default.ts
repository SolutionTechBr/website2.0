import { MigrationInterface, QueryRunner } from "typeorm";

export class default1694730560564 implements MigrationInterface {
    name = 'default1694730560564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Product" RENAME COLUMN "imageUrl" TO "dados"`);
        await queryRunner.query(`ALTER TABLE "Product" DROP COLUMN "dados"`);
        await queryRunner.query(`ALTER TABLE "Product" ADD "dados" bytea`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Product" DROP COLUMN "dados"`);
        await queryRunner.query(`ALTER TABLE "Product" ADD "dados" text`);
        await queryRunner.query(`ALTER TABLE "Product" RENAME COLUMN "dados" TO "imageUrl"`);
    }

}
