import {Order} from "../entities/Order";
import {Menu} from "../entities/Menu";
import {getRepository} from "typeorm";
import {ProductLine} from "../entities/ProductLine";
import {Discount} from "../entities/Discount";
import {User} from "../entities/User";
import {userFromToken} from "../helpers/queryHelpers/userQueryHelper";

export class OrderController {

    static async setResponsibleOfOrder(orderId: number, userId: number): Promise<Order> {
        const order = await getRepository(Order).findOne(orderId)
        const user = await getRepository(User).findOne(userId);
        order.inChargeOfOrder = user;
        return await getRepository(Order).save(order);
    }


    static async createOrder(orderCustomerId?: number, menuIds?: [{ menuId: number, xl: boolean }], productLineIds?: number[]): Promise<Order> {
        let menus: Menu[], productLines, orderCustomer = null;
        if (menuIds) {
            menus = await getRepository(Menu).findByIds(menuIds.map(menuId => menuId.menuId))
        }
        if (productLineIds) {
            productLines = await getRepository(ProductLine).findByIds(productLineIds)
        }
        if (orderCustomerId) {
            orderCustomer = await getRepository(ProductLine).findOne({id: orderCustomerId})
        }
        let price = 0;
        for (let i = 0; i < productLines.length; i++) {
            let discount = await getRepository(Discount).findOne({id: productLines[i].id});
            if (discount) {
                price += discount.discount;
            } else {
                price += productLines[i].price;
            }
        }
        for (let i = 0; i < menus.length; i++) {
            let discount = await getRepository(Discount).findOne({id: menus[i].id});
            if (discount) {
                price += discount.discount;
            } else {
                const isXL = menuIds.find(menu => menu.menuId === menus[i].id).xl;
                if (isXL) {
                    price += menus[i].price + 0.75;
                } else {
                    price += menus[i].price;
                }
            }
        }
        const order = await getRepository(Order).create({
            orderNum:Math.floor(Math.random() * Math.floor(1000000)),
            orderCustomer: orderCustomer,
            menus: menus,
            productLines: productLines,
            price: price
        });
        return getRepository(Order).save(order);
    }

    static async getCustomerOrders(token: string) {
        const user = await userFromToken(token);
        return await getRepository(Order).find({ where: { orderCustomer: user }});
    }
}
