import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { TermosUso } from "./TemosUso";
import { TipoUsuario } from "../Types/TipoUsuario";
import { UsuarioTermosUso } from "./UsuarioTermosUso";

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

  @OneToMany(() => UsuarioTermosUso, (usuarioTermosUso) => usuarioTermosUso.usuario)
  usuarioTermosUso: UsuarioTermosUso[];


}