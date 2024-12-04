import { MigrationInterface, QueryRunner } from "typeorm";

export class Usuario1733341746119 implements MigrationInterface {
    name = 'Usuario1733341746119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id_usuario" SERIAL NOT NULL, "nome_completo" character varying NOT NULL, "email" character varying NOT NULL, "ativo" boolean NOT NULL, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_dd52716c2652e0e23c15530c695" PRIMARY KEY ("id_usuario"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
