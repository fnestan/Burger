import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Menu} from "./Menu";
import {ProductLine} from "./ProductLine";

@Entity()
export class Discount {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Menu, {eager: true, nullable: true})
    @JoinColumn()
    menu: Menu;

    @OneToOne(type => ProductLine, line => line.discount, {eager: true, nullable: true, onDelete: "CASCADE"})
    @JoinColumn()
    productLine: ProductLine;

    @Column({type: "float"})
    discount: number;


}
