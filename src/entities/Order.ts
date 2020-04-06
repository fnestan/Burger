import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Menu} from "./Menu";
import {ProductLine} from "./ProductLine";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "float"})
    price: number;

    @Column()
    orderNum: number;

    @OneToOne(type => User, {nullable: true})
    @JoinColumn()
    inChargeOfOrder: User;

    @OneToOne(type => User, {nullable: true})
    @JoinColumn()
    orderCustomer: User;

    @ManyToMany(type => Menu, {nullable: true,eager:true})
    @JoinTable()
    menus: Menu[];

    @ManyToMany(type => ProductLine, {nullable: true,eager:true})
    @JoinTable()
    productLines: ProductLine[];


}
