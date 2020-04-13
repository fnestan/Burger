import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
import {Recipe} from "./Recipe";
import {MenuOrder} from "./MenuOrder";
import {ProductLineOrder} from "./ProductLineOrder";

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
    product: Product;

    @OneToMany(type => Recipe, recipe => recipe.productLine, {eager: true})
    recipes: Recipe[];

    @OneToMany(type => ProductLineOrder, ProductLineOrder => ProductLineOrder.productLine)
    ProductLinesOrders: ProductLineOrder[];
}
