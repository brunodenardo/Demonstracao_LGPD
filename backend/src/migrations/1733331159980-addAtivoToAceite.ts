import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAtivoToAceite1733331159980 implements MigrationInterface {
    name = 'AddAtivoToAceite1733331159980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aceites_itens" ADD "ativo" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aceites_itens" DROP COLUMN "ativo"`);
    }

}
