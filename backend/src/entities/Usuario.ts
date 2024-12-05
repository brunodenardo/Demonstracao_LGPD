import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { TipoUsuario } from "../Types/TipoUsuario";
import { AceiteItem } from "./AceiteItem";

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

  @Column({unique:true})
  email: string;

  @Column()
  cpf: string;

  @Column()
  cep: string;

  @Column()
  ativo: boolean;

  @Column({default: TipoUsuario.comum})
  tipo: TipoUsuario

  @OneToMany(() => AceiteItem, (aceiteItem) => aceiteItem.usuario)
  aceites: AceiteItem[];
}