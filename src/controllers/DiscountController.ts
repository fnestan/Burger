import {ProductLine} from "../entities/ProductLine";
import {createQueryBuilder, getRepository} from "typeorm";
import {Discount} from "../entities/Discount";
import {Menu} from "../entities/Menu";
import {IMessageResponse} from "../interfaces/IMessageResponse";
import {Product} from "../entities/Product";

export class DiscountController {
    static async getAllDiscount(): Promise<Discount[]> {
        const discounts =  await getRepository(Discount).find();
        for (let i = 0; i < discounts.length; i++) {
            if (discounts[i].productLine) {
                let id = discounts[i].productLine.id;
                const prd = await createQueryBuilder('Product')
                    .leftJoinAndSelect(
                        'Product.productLines',
                        'productLines')
                    .where('productLines.id = :id', {id})
                    .getOne();
                (prd as Product).productLines = [];
                discounts[i].productLine.product = prd;
            }

        }
        return discounts;
    }

    static async createDiscount(discountPrice: number, menuId?: number, productLineId?: number): Promise<Discount> {
        let menu, productLine = null;
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
        return await getRepository(Discount).save(discount);
    }

    static async updateDiscount(id: number, discountPrice: number): Promise<Discount> {
        const discountUpdate = {
            id: id,
            discount: discountPrice
        };
        const resDiscount = await getRepository(Discount).preload(discountUpdate);
        return await getRepository(Discount).save(resDiscount);

    }

    static async deleteDiscount(id: number): Promise<IMessageResponse> {
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
