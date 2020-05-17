import {Order} from "../entities/Order";
import {Menu} from "../entities/Menu";
import {getRepository} from "typeorm";
import {ProductLine} from "../entities/ProductLine";
import {Discount} from "../entities/Discount";
import {userFromToken} from "../helpers/queryHelpers/userQueryHelper";
import {MenuOrder} from "../entities/MenuOrder";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {ProductLineOrder} from "../entities/ProductLineOrder";
import {PdfGen} from "../helpers/pdf/PdfGen";
import get = Reflect.get;

export class OrderController {

    static async setResponsibleOfOrder(orderId: number, token: string): Promise<Order> {
        const order = await getRepository(Order).findOne(orderId)
        const user = await userFromToken(token);
        order.inChargeOfOrder = user;
        return await getRepository(Order).save(order);
    }


    static async createOrder(orderCustomerId?: number,
                             menuIds?: [{
                                 menuId: number, xl: boolean,
                                 productLine: [{ productLineId: number, ingredienttoremove: [] }]
                             }],
                             productLineIds?: [{ productLineId: number, ingredienttoremove: number[] }]): Promise<Order> {
        let orderCustomer = null;
        let price = 0;
        if (orderCustomerId) {
            orderCustomer = await getRepository(ProductLine).findOne({id: orderCustomerId})
        }
        const order = await getRepository(Order).create({
            orderNum: Math.floor(Math.random() * Math.floor(1000000)),
            orderCustomer: orderCustomer,
            price: price,
            ispaid: false,
            dateOrder: new Date(),
            isPick: false,
            isReady: false,
            menuOrders: [],
            productLineOrders: []
        });
        getRepository(Order).save(order);
        if (menuIds) {
            for (let i = 0; i < menuIds.length; i++) {
                const menu = await getRepository(Menu).findOne({id: menuIds[i].menuId});
                let stringRemoveIngredients: string = null;
                let menuPrice = 0;
                if (menuIds[i].productLine) {
                    stringRemoveIngredients = await VerificationHelper.stringforRemoveIngredientofmenu(menuIds[i].productLine);
                }
                let discount = await getRepository(Discount).findOne({menu: menu});
                if (discount) {
                    price += discount.discount;
                    menuPrice = discount.discount;
                } else {
                    const isXL = menuIds[i].xl;
                    if (isXL) {
                        price += menu.priceXl;
                        menuPrice = menu.priceXl;
                    } else {
                        price += menu.price;
                        menuPrice = menu.price;
                    }
                }
                const menuOrder = getRepository(MenuOrder).create({
                    menu: menu,
                    order: order,
                    IsXl: menuIds[i].xl,
                    price: menuPrice,
                    ingredientRemove: stringRemoveIngredients
                });
                await getRepository(MenuOrder).save(menuOrder);
                order.menuOrders.push(menuOrder);
            }
        }
        if (productLineIds) {
            //productId
            for (let i = 0; i < productLineIds.length; i++) {
                const productLine = await getRepository(ProductLine).findOne({id: productLineIds[i].productLineId});
                let lineOrderPrice = 0;
                const stringRemoveIngredients: string = await VerificationHelper.stringforRemoveIngredientofProductLine(productLine, productLineIds[i].ingredienttoremove);

                let discount = await getRepository(Discount).findOne({productLine: productLine});
                if (discount) {
                    price += discount.discount;
                    lineOrderPrice = discount.discount;
                } else {
                    price += productLine.price;
                    lineOrderPrice = productLine.price;

                }
                const productLineOrder = getRepository(ProductLineOrder).create({
                    productLine: productLine,
                    order: order,
                    ingredientRemove: stringRemoveIngredients,
                    price: lineOrderPrice
                });
                await getRepository(ProductLineOrder).save(productLineOrder);
                order.productLineOrders.push(productLineOrder);
            }
        }
        order.price = price;
        const resOrder = await getRepository(Order).save(order);
        await PdfGen.genPdf(resOrder);
        return resOrder;
    }

    static async getCustomerOrders(token: string) {
        const user = await userFromToken(token);
        return await getRepository(Order).find({where: {orderCustomer: user}});
    }

    static async orderIsReady(token: string, id: number) {
        const user = await userFromToken(token);
        const order = await getRepository(Order).findOne(id);
        console.log(user.id);
        console.log(order);
        if (user && order.inChargeOfOrder.id == user.id) {
            order.isReady = true;
            return await getRepository(Order).save(order);
        }
    }

    static async getMyOrderToTreated(token: string) {
        console.log(token);
        const user = await userFromToken(token);
        return await getRepository(Order).find({
            where: {
                isReady: false,
                inChargeOfOrder: user,
                ispaid: true
            }
        });

    }

    static async getNonChargerOrders() {
        return await getRepository(Order).find({
            where: {
                inChargeOfOrder: null,
                ispaid: true
            }
        });
    }


    static async getNonPaidOrders() {
        return await getRepository(Order).find({
            where: {
                ispaid: false,
            }
        });
    }

    static async getReadyOrders() {
        return await getRepository(Order).find({
            where: {
                ispaid: true,
                isPick: false,
                isReady: true
            }
        });
    }

    static async orderIsPick(id: number) {
        const order = await getRepository(Order).findOne(id);
        console.log(order)
        if (order.ispaid && order.isReady) {
            order.isPick = true;
            return await getRepository(Order).save(order);
        }
        return {message: "Cette commande n'a pas été payée"};
    }

    static async orderIsPaid(id: number) {
        const order = await getRepository(Order).findOne(id);
        order.ispaid = true;
        return await getRepository(Order).save(order);
    }
}
