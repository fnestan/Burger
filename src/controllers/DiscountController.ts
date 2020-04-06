import {ProductLine} from "../entities/ProductLine";
import {IError} from "../interfaces/IError";
import {Product} from "../entities/Product";
import {Column, getRepository, OneToOne} from "typeorm";
import {ISuccess} from "../interfaces/ISuccess";
import {Discount} from "../entities/Discount";
import {Menu} from "../entities/Menu";

export class DiscountController {
    static async getAllDiscount(): Promise<Discount[]> {
        return await getRepository(Discount).find();
    }

    static async createDiscount(discountPrice: number, menuId?: number, productLineId?: number): Promise<Discount> {
        let menu, productLine = null;
        console.log(productLineId);
        // TODO: Checker si le menu ou le produit existe et retourner un message
        if (menuId) {
            menu = await getRepository(Menu).findOne({where: {id: menuId}});
        }

        if (productLineId) {
            productLine = await getRepository(ProductLine).findOne({where: {id: productLineId}});
        }

        const discount: Discount = await getRepository(Discount).create({
            discount: discountPrice,
            menu: menu,
            productLine: productLine
        });
        console.log('discount', discount);
        return await getRepository(Discount).save(discount);
    }

    static async updateDiscount(id: number, discountPrice: number): Promise<Discount | IError> {
        try {
            const discountUpdate = {
                id: id,
                discount: discountPrice
            };
            const resDiscount = await getRepository(Discount).preload(discountUpdate);
            return await getRepository(Discount).save(resDiscount);
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async deleteDiscount(id: number): Promise<ISuccess | IError> {
        try {
            const discount = await getRepository(Discount).delete(id);
            return {
                Code: 201,
                Message: "Successful"
            }
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }
}
