import { MigrationInterface, QueryRunner } from "typeorm";

export class UsuarioTermosUso1732658179509 implements MigrationInterface {
    name = 'UsuarioTermosUso1732658179509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario_termos_uso" ("id" SERIAL NOT NULL, "aceito" boolean NOT NULL, "usuarioIdUsuario" integer, "termosUsoId" integer, CONSTRAINT "PK_55f1c81ea7be160d4ab0aab9bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "termos_uso" ALTER COLUMN "data_cracao" SET DEFAULT '"2024-11-26T21:56:43.673Z"'`);
        await queryRunner.query(`ALTER TABLE "usuario_termos_uso" ADD CONSTRAINT "FK_48e0590fa8cb4dc25e8842b0916" FOREIGN KEY ("usuarioIdUsuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_termos_uso" ADD CONSTRAINT "FK_c1d14a8cb4ac566e02aeba6528c" FOREIGN KEY ("termosUsoId") REFERENCES "termos_uso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_termos_uso" DROP CONSTRAINT "FK_c1d14a8cb4ac566e02aeba6528c"`);
        await queryRunner.query(`ALTER TABLE "usuario_termos_uso" DROP CONSTRAINT "FK_48e0590fa8cb4dc25e8842b0916"`);
        await queryRunner.query(`ALTER TABLE "termos_uso" ALTER COLUMN "data_cracao" SET DEFAULT '2024-11-26 21:17:50.913'`);
        await queryRunner.query(`DROP TABLE "usuario_termos_uso"`);
    }

}
