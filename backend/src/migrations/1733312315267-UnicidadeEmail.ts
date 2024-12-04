import { MigrationInterface, QueryRunner } from "typeorm";

export class UnicidadeEmail1733312315267 implements MigrationInterface {
    name = 'UnicidadeEmail1733312315267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "termos_uso" ALTER COLUMN "data_criacao" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "UQ_2863682842e688ca198eb25c124"`);
        await queryRunner.query(`ALTER TABLE "termos_uso" ALTER COLUMN "data_criacao" SET DEFAULT '2024-11-27 10:46:51.179'`);
    }

}
