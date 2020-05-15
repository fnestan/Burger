import {createQueryBuilder, getRepository} from "typeorm";
import {Menu} from "../entities/Menu";
import {ProductLine} from "../entities/ProductLine";
import {Forward} from "../entities/Forward";
import {IMessageResponse} from "../interfaces/IMessageResponse";
import {Product} from "../entities/Product";


export class ForwardController {

    static async getAllForwards(): Promise<Forward[]> {
        const forwards = await getRepository(Forward).find();
        for (let i = 0; i < forwards.length; i++) {
            if (forwards[i].prductline) {
                let id = forwards[i].prductline.id;
                const prd = await createQueryBuilder('Product')
                    .leftJoinAndSelect(
                        'Product.productLines',
                        'productLines')
                    .where('productLines.id = :id', {id})
                    .getOne();
                (prd as Product).productLines = [];
                forwards[i].prductline.product = prd;
            }

        }
        return forwards
    }

    static async createForward(description: string, menuId?: number, productLineId?: number): Promise<Forward> {
        let menu, productLine = null;
        // TODO: Checker si le menu ou le produit existe et retourner un message
        if (menuId) {
            menu = await getRepository(Menu).findOne({where: {id: menuId}});
        }

        if (productLineId) {
            productLine = await getRepository(ProductLine).findOne({where: {id: productLineId}});
        }

        const forward: Forward = await getRepository(Forward).create({
            prductline: productLine,
            menu: menu,
            description: description
        });
        return await getRepository(Forward).save(forward);
    }

    static async updateForward(id: number, description: string): Promise<Forward> {
        const forwardUpdate = {
            id: id,
            description: description
        };
        const resForward = await getRepository(Forward).preload(forwardUpdate);
        return await getRepository(Forward).save(resForward);
    }

    static async deleteForward(id: number): Promise<IMessageResponse> {
        try {
            const forward = await getRepository(Forward).delete(id);
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
