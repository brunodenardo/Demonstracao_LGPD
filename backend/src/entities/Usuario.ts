import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { TermosUso } from "./TemosUso";
import { TipoUsuario } from "../Types/TipoUsuario";

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nome_completo: string;

  @Column()
  data_nascimento: Date;

  @Column()
  senha:string

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  cep: string;

  @Column()
  ativo: boolean;

  @Column({default: TipoUsuario.comum})
  tipo: TipoUsuario

  @ManyToMany(() => TermosUso, (termos_uso) => termos_uso.usuarios)
  @JoinTable() // Cria a tabela intermediária para o relacionamento muitos para muitos
  termos_uso: TermosUso[];


}