import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Unit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

}
