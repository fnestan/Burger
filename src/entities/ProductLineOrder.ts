import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./Order";
import {ProductLine} from "./ProductLine";

@Entity()
export class ProductLineOrder {


    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Order, order => order.productLineOrders)
    order: Order;

    @Column({type: "float"})
    price: number;

    @ManyToOne(type => ProductLine, productLine => productLine.ProductLinesOrders ,{eager:true})
    productLine: ProductLine;

    @Column()
    ingredientRemove: string;
}
