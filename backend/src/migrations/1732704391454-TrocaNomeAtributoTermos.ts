import { MigrationInterface, QueryRunner } from "typeorm";

export class TrocaNomeAtributoTermos1732704391454 implements MigrationInterface {
    name = 'TrocaNomeAtributoTermos1732704391454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "termos_uso" RENAME COLUMN "data_cracao" TO "data_criacao"`);
        await queryRunner.query(`ALTER TABLE "termos_uso" ALTER COLUMN "data_criacao" SET DEFAULT '"2024-11-27T10:46:51.179Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "termos_uso" ALTER COLUMN "data_criacao" SET DEFAULT '2024-11-26 23:31:07.659'`);
        await queryRunner.query(`ALTER TABLE "termos_uso" RENAME COLUMN "data_criacao" TO "data_cracao"`);
    }

}
