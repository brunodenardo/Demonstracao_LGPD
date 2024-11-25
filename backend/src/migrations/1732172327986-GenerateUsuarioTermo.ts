import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateUsuarioTermo1732172327986 implements MigrationInterface {
    name = 'GenerateUsuarioTermo1732172327986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id_usuario" SERIAL NOT NULL, "nome_completo" character varying NOT NULL, "data_nascimento" TIMESTAMP NOT NULL, "senha" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "cep" character varying NOT NULL, "ativo" boolean NOT NULL, "tipo" character varying NOT NULL DEFAULT 'COMUM', CONSTRAINT "PK_dd52716c2652e0e23c15530c695" PRIMARY KEY ("id_usuario"))`);
        await queryRunner.query(`CREATE TABLE "termos_uso" ("id" SERIAL NOT NULL, "termos" text NOT NULL, "obrigatoriedade" boolean NOT NULL DEFAULT true, "ativo" boolean NOT NULL DEFAULT true, "data_cracao" TIMESTAMP NOT NULL DEFAULT '"2024-11-21T06:58:49.368Z"', "data_desativacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_c5f1a078820a4fb4f39107c5a99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_termos_uso_termos_uso" ("usuarioIdUsuario" integer NOT NULL, "termosUsoId" integer NOT NULL, CONSTRAINT "PK_513e7b364f4f618a6a117817af5" PRIMARY KEY ("usuarioIdUsuario", "termosUsoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_856e6bf83fa566d901ff527553" ON "usuario_termos_uso_termos_uso" ("usuarioIdUsuario") `);
        await queryRunner.query(`CREATE INDEX "IDX_b4f7f8ac927b17fb4569d43af7" ON "usuario_termos_uso_termos_uso" ("termosUsoId") `);
        await queryRunner.query(`ALTER TABLE "usuario_termos_uso_termos_uso" ADD CONSTRAINT "FK_856e6bf83fa566d901ff5275532" FOREIGN KEY ("usuarioIdUsuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuario_termos_uso_termos_uso" ADD CONSTRAINT "FK_b4f7f8ac927b17fb4569d43af77" FOREIGN KEY ("termosUsoId") REFERENCES "termos_uso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_termos_uso_termos_uso" DROP CONSTRAINT "FK_b4f7f8ac927b17fb4569d43af77"`);
        await queryRunner.query(`ALTER TABLE "usuario_termos_uso_termos_uso" DROP CONSTRAINT "FK_856e6bf83fa566d901ff5275532"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b4f7f8ac927b17fb4569d43af7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_856e6bf83fa566d901ff527553"`);
        await queryRunner.query(`DROP TABLE "usuario_termos_uso_termos_uso"`);
        await queryRunner.query(`DROP TABLE "termos_uso"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
