import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Menu} from "./Menu";
import {ProductLine} from "./ProductLine";

@Entity()
export class Forward {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @OneToOne(type => Menu, {eager: true})
    @JoinColumn()
    menu: Menu;

    @OneToOne(type => ProductLine, {eager: true})
    @JoinColumn()
    prductline: ProductLine;
}
