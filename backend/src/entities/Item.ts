import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TermoDeUso } from "./TermoDeUso";
import { AceiteItem } from "./AceiteItem";

@Entity("itens_termos")
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TermoDeUso, (termo) => termo.itens, {onDelete:"CASCADE"})
    termo: TermoDeUso;

    @Column()
    descricao: string;

    @Column()
    obrigatorio: boolean;

    @OneToMany(() => AceiteItem, (aceiteItem) => aceiteItem.item)
    aceites: AceiteItem[];

}