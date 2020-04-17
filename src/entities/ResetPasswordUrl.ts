import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class ResetPasswordUrl {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    close: boolean;

    @ManyToOne(type => User,{eager:true})
    user: User;
}
