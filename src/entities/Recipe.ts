import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductLine} from "./ProductLine";
import {Ingredient} from "./Ingredient";
import {Unit} from "./Unit";

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    removable: boolean;

    @ManyToOne(type => Unit)
    unit: Unit;

    @ManyToOne(type => ProductLine, line => line.recipes)
    productLine: ProductLine;

    @ManyToOne(type => Ingredient)
    ingredient: Ingredient


}
