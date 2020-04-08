import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
import {Recipe} from "./Recipe";

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

    @ManyToOne(type => Product, product => product.productLines, {eager: true, onDelete: 'CASCADE', lazy: true})
    product: Product;
}
