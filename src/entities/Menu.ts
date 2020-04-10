import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductLine} from "./ProductLine";
import {MenuOrder} from "./MenuOrder";

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

    @Column({type: "float"})
    priceXl: number;

    @ManyToMany(type => ProductLine, {eager:true})
    @JoinTable()
    productLines: ProductLine[];

    @OneToMany(type => MenuOrder, menuOrder=> menuOrder.menu)
    menuOrders: MenuOrder[];
}
