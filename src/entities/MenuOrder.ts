import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./Order";
import {CommandUtils} from "typeorm/commands/CommandUtils";
import {Menu} from "./Menu";

@Entity()
export class MenuOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Order, order => order.menuOrders)
    order: Order;

    @ManyToOne(type => Menu, menu => menu.menuOrders, {eager:true})
    menu: Menu;

    @Column()
    IsXl: boolean;

    @Column({type: "float"})
    price: number;

    @Column({nullable: true})
    ingredientRemove: string;


}
