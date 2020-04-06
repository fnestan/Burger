import {Discount} from "../entities/Discount";
import {getRepository} from "typeorm";
import {Menu} from "../entities/Menu";
import {ProductLine} from "../entities/ProductLine";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {Forward} from "../entities/Forward";


export class ForwardController {

    static async getAllForwards(): Promise<Forward[]> {
        return await getRepository(Forward).find();
    }

    static async createForward(description: string, menuId?: number, productLineId?: number): Promise<Forward> {
        let menu, productLine = null;
        console.log(productLineId);
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

    static async updateForward(id: number, description: string): Promise<Forward | IError> {
        try {
            const forwardUpdate = {
                id: id,
                description: description
            };
            const resForward = await getRepository(Forward).preload(forwardUpdate);
            return await getRepository(Forward).save(resForward);
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async deleteForward(id: number): Promise<ISuccess | IError> {
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
