import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
import {Recipe} from "./Recipe";
import {ProductLineOrder} from "./ProductLineOrder";
import {Forward} from "./Forward";
import {Discount} from "./Discount";

@Entity()
export class ProductLine {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    desc_size: string;

    @Column({type: "float"})
    price: number;

    @Column()
    orderable: boolean;


    @ManyToOne(type => Product, product => product.productLines, {onDelete: 'CASCADE', lazy: true})
    product: unknown;

    @OneToMany(type => Recipe, recipe => recipe.productLine, {eager: true})
    recipes: Recipe[];

    @OneToMany(type => ProductLineOrder, ProductLineOrder => ProductLineOrder.productLine)
    ProductLinesOrders: ProductLineOrder[];

    @OneToOne(type => Forward, forward => forward.prductline, {onDelete: "CASCADE"})
    forward: Forward;

    @OneToOne(type => Discount, discount => discount.productLine, {onDelete: "CASCADE"})
    discount: Discount;
}
