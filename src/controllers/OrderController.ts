import {Order} from "../entities/Order";
import {Menu} from "../entities/Menu";
import {getRepository} from "typeorm";
import {ProductLine} from "../entities/ProductLine";
import {Discount} from "../entities/Discount";
import {User} from "../entities/User";
import {userFromToken} from "../helpers/queryHelpers/userQueryHelper";
import {MenuOrder} from "../entities/MenuOrder";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {ProductLineOrder} from "../entities/ProductLineOrder";

export class OrderController {

    static async setResponsibleOfOrder(orderId: number, userId: number): Promise<Order> {
        const order = await getRepository(Order).findOne(orderId)
        const user = await getRepository(User).findOne(userId);
        order.inChargeOfOrder = user;
        return await getRepository(Order).save(order);
    }


    static async createOrder(orderCustomerId?: number,
                             menuIds?: [{
                                 menuId: number, xl: boolean,
                                 productLine: [{ productLineId: number, ingredienttoremove: [] }]
                             }],
                             productLineIds?: [{ productId: number, removeIngredient: number[] }]): Promise<Order> {
        let menus: Menu[], productLines, orderCustomer = null;
        if (menuIds) {
            menus = await getRepository(Menu).findByIds(menuIds.map(menuId => menuId.menuId))
        }
        if (productLineIds) {
            //productId
            productLines = await getRepository(ProductLine).findByIds(productLineIds.map(productLineId => productLineId.productId))
        }
        if (orderCustomerId) {
            orderCustomer = await getRepository(ProductLine).findOne({id: orderCustomerId})
        }
        let price = 0;
        const order = await getRepository(Order).create({
            orderNum: Math.floor(Math.random() * Math.floor(1000000)),
            orderCustomer: orderCustomer,
            price: price
        });
        for (let i = 0; i < productLines.length; i++) {
            const stringRemoveIngredients: string = await VerificationHelper.stringforRemoveIngredient(menuIds[i].productLine);
            const productLineOrder = getRepository(ProductLineOrder).create({
                productLine: productLines[i],
                order: order,
                ingredientRemove: stringRemoveIngredients
            });
            await getRepository(ProductLineOrder).save(productLineOrder);
            order.productLineOrders.push(productLineOrder);
            let discount = await getRepository(Discount).findOne({id: productLines[i].id});
            if (discount) {
                price += discount.discount;
            } else {
                price += productLines[i].price;
            }
        }
        for (let i = 0; i < menus.length; i++) {
            const stringRemoveIngredients: string = await VerificationHelper.stringforRemoveIngredient(menuIds[i].productLine);
            const menuOrder = getRepository(MenuOrder).create({
                menu: menus[i],
                order: order,
                IsXl: menuIds[i].xl,
                ingredientRemove: stringRemoveIngredients
            });
            await getRepository(ProductLineOrder).save(menuOrder);
            order.menuOrders.push(menuOrder);
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
        order.price = price;
        return getRepository(Order).save(order);
    }

    static async getCustomerOrders(token: string) {
        const user = await userFromToken(token);
        return await getRepository(Order).find({where: {orderCustomer: user}});
    }
}
