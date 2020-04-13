import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";

@Entity()
export class RefTypeProduct {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @OneToMany(type => Product, product => product.type, {eager: true, onDelete: 'CASCADE'})
    products: Product[]
}
