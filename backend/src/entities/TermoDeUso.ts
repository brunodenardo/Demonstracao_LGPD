import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Item } from "./Item";
import { AceiteItem } from "./AceiteItem";

@Entity("termos_de_uso")
export class TermoDeUso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  versao: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  data_criacao: Date;

  @OneToMany(() => Item, (itemTermo) => itemTermo.termo)
  itens: Item[];

  @OneToMany(() => AceiteItem, (aceiteItem) => aceiteItem.termo)
  aceites: AceiteItem[];
}