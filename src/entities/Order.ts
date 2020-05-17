import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
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

    @Column()
    ispaid: boolean;

    @Column()
    isReady: boolean;

    @Column()
    isPick: boolean;

    @Column()
    dateOrder: Date;

    @ManyToOne(type => User, {nullable: true, eager: true})
    @JoinColumn()
    inChargeOfOrder: User;

    @OneToOne(type => User, {nullable: true, eager: true})
    @JoinColumn()
    orderCustomer: User;

    @OneToMany(type => MenuOrder, menuorder => menuorder.order, {nullable: true, eager: true})
    @JoinTable()
    menuOrders: MenuOrder[];

    @OneToMany(type => ProductLineOrder, productLineOrder => productLineOrder.order, {nullable: true, eager: true})
    @JoinTable()
    productLineOrders: ProductLineOrder[];


}
