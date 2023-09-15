import { MigrationInterface, QueryRunner } from "typeorm";

export class default1694727480130 implements MigrationInterface {
    name = 'default1694727480130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Product" ADD "imageUrl" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Product" DROP COLUMN "imageUrl"`);
    }

}
