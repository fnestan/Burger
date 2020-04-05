import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";
import {IsEmail} from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    lastname: string;

    @Column({nullable: false})
    firstname: string;

    @Column({nullable: false})
    @IsEmail()
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: true})
    token: string;

    @ManyToOne(type => Role, {eager: true})
    role: Role;
}
