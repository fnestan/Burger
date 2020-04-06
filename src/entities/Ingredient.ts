import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductLine} from "./ProductLine";
import {Recipe} from "./Recipe";

@Entity()
export class Ingredient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string
}
