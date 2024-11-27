import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Usuario } from "./Usuario";
import { UsuarioTermosUso } from "./UsuarioTermosUso";

@Entity()
export class TermosUso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  termos: string; // Um texto grande para os termos

  @Column({ default: true })
  obrigatoriedade: boolean; // Indica se o termo é obrigatório

  @Column({ default: true })
  ativo: boolean; // Indica se o termo está ativo

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  data_criacao: Date;

  @Column()
  data_desativacao!: Date;

  @OneToMany(() => UsuarioTermosUso, (usuarioTermosUso) => usuarioTermosUso.termosUso)
  usuarioTermosUso: UsuarioTermosUso[];
}