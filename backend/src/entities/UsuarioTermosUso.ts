import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";
import { TermosUso } from "./TermosUso";

@Entity()
export class UsuarioTermosUso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioTermosUso)
  usuario: Usuario;

  @ManyToOne(() => TermosUso, (termosUso) => termosUso.usuarioTermosUso)
  termosUso: TermosUso;

  @Column()
  aceito: boolean;

}