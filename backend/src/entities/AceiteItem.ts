import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne
  } from "typeorm";
  import { Usuario } from "./Usuario";
  import { TermoDeUso } from "./TermoDeUso";
  import { Item } from "./Item";
  
  @Entity("aceites_itens")
  export class AceiteItem {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Usuario, (usuario) => usuario.aceites, { onDelete: "CASCADE" })
    usuario: Usuario;
  
    @ManyToOne(() => TermoDeUso, (termo) => termo.aceites, { onDelete: "CASCADE" })
    termo: TermoDeUso;
  
    @ManyToOne(() => Item, (item) => item.aceites, { onDelete: "CASCADE" })
    item: Item;
  
    @Column()
    aceito: boolean;

    @Column({ default: true })
    ativo: boolean;
  
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataInteracao: Date;
  }
  