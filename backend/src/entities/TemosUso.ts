import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Usuario } from "./Usuario";

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

  @Column({default: new Date})
  data_cracao: Date;

  @Column()
  data_desativacao!: Date;

  @ManyToMany(() => Usuario, (usuario) => usuario.termos_uso)
  usuarios!: Usuario[];
}