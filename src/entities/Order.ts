import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Menu} from "./Menu";
import {ProductLine} from "./ProductLine";
import {MenuOrder} from "./MenuOrder";
import {ProductLineOrder} from "./ProductLineOrder";

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

    @OneToMany(type => MenuOrder, menuorder => menuorder.order, {nullable: true, eager: true})
    @JoinTable()
    menuOrders: MenuOrder[];

    @ManyToMany(type => ProductLineOrder, productLineOrder => productLineOrder.order, {nullable: true, eager: true})
    @JoinTable()
    productLineOrders: ProductLineOrder[];


}
