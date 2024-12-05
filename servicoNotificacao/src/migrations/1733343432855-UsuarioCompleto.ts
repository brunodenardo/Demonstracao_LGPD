import { MigrationInterface, QueryRunner } from "typeorm";

export class UsuarioCompleto1733343432855 implements MigrationInterface {
    name = 'UsuarioCompleto1733343432855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "data_nascimento" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD "senha" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD "cpf" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD "cep" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD "tipo" character varying NOT NULL DEFAULT 'COMUM'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "tipo"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "data_nascimento"`);
    }

}
