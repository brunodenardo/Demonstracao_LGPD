import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1733320618328 implements MigrationInterface {
    name = 'InitialSchema1733320618328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "itens_termos" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "obrigatorio" boolean NOT NULL, "termoId" integer, CONSTRAINT "PK_27594a4222f10411659e204ca02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "termos_de_uso" ("id" SERIAL NOT NULL, "versao" text NOT NULL, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_45a23179b070814c71105026889" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aceites_itens" ("id" SERIAL NOT NULL, "aceito" boolean NOT NULL, "dataInteracao" TIMESTAMP NOT NULL DEFAULT now(), "usuarioIdUsuario" integer, "termoId" integer, "itemId" integer, CONSTRAINT "PK_8e3cb7ff517e1a73651e9a6dd8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id_usuario" SERIAL NOT NULL, "nome_completo" character varying NOT NULL, "data_nascimento" TIMESTAMP NOT NULL, "senha" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "cep" character varying NOT NULL, "ativo" boolean NOT NULL, "tipo" character varying NOT NULL DEFAULT 'COMUM', CONSTRAINT "PK_dfe59db369749f9042499fd8107" PRIMARY KEY ("id_usuario"))`);
        await queryRunner.query(`ALTER TABLE "itens_termos" ADD CONSTRAINT "FK_9fb42281e8650b6b29462731fae" FOREIGN KEY ("termoId") REFERENCES "termos_de_uso"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aceites_itens" ADD CONSTRAINT "FK_5f9afd9aa8dde546226e4db50b4" FOREIGN KEY ("usuarioIdUsuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aceites_itens" ADD CONSTRAINT "FK_f56a0c497b9c30ea1f866c69f2a" FOREIGN KEY ("termoId") REFERENCES "termos_de_uso"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aceites_itens" ADD CONSTRAINT "FK_7e383d93f8d9122e54910b83d41" FOREIGN KEY ("itemId") REFERENCES "itens_termos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aceites_itens" DROP CONSTRAINT "FK_7e383d93f8d9122e54910b83d41"`);
        await queryRunner.query(`ALTER TABLE "aceites_itens" DROP CONSTRAINT "FK_f56a0c497b9c30ea1f866c69f2a"`);
        await queryRunner.query(`ALTER TABLE "aceites_itens" DROP CONSTRAINT "FK_5f9afd9aa8dde546226e4db50b4"`);
        await queryRunner.query(`ALTER TABLE "itens_termos" DROP CONSTRAINT "FK_9fb42281e8650b6b29462731fae"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "aceites_itens"`);
        await queryRunner.query(`DROP TABLE "termos_de_uso"`);
        await queryRunner.query(`DROP TABLE "itens_termos"`);
    }

}
