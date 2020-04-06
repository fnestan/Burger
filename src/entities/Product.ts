import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RefTypeProduct} from "./RefTypeProduct";
import {ProductLine} from "./ProductLine";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => RefTypeProduct, type => type.products, { onDelete: 'CASCADE'})
    type: RefTypeProduct;

    @OneToMany(type => ProductLine, productLine => productLine.product, {eager: true, onDelete: 'CASCADE'})
    productLines: ProductLine[];
}
