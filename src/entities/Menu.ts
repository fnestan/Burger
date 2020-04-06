import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductLine} from "./ProductLine";

@Entity()
export class Menu {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: "float"})
    price: number;

    @Column()
    orderable: boolean;

    @ManyToMany(type => ProductLine, {eager:true})
    @JoinTable()
    productLines: ProductLine[];

}
