import {getRepository} from "typeorm";
import {ProductLine} from "../entities/ProductLine";
import {Menu} from "../entities/Menu";
import {IMessageResponse} from "../interfaces/IMessageResponse";

export class MenuController {

    static async getAllMenu(isAdmin: boolean): Promise<Menu[]> {
        if (isAdmin) {
            return await getRepository(Menu).find();
        }
        return await getRepository(Menu).find({
            where: {
                orderable: true
            }
        });
    }

    static async getMenuById(isAdmin: boolean, idMenu: number): Promise<Menu> {
        if (isAdmin) {
            return await getRepository(Menu).findOne(idMenu);
        }
        return await getRepository(Menu).findOne({
            where: {
                id: idMenu,
                orderable: true
            }
        });
    }


    static async createMenu(name: string, price: number, orderable: boolean, productLineIds: number[], priceXl: number): Promise<Menu> {
        const productLines: ProductLine[] = await getRepository(ProductLine).findByIds(productLineIds);
        const menu: Menu = await getRepository(Menu).create({
            name: name,
            price: price,
            orderable: orderable,
            priceXl: priceXl
        });
        menu.productLines = productLines;
        return await getRepository(Menu).save(menu);
    }

    static async updateMenu(id: number, name: string, price: number, orderable: boolean, productLineIds: number[], priceXl: number): Promise<Menu> {
        const productLines: ProductLine[] = await getRepository(ProductLine).findByIds(productLineIds);
        const menu = {
            id: id,
            name: name,
            price: price,
            orderable: orderable,
            productLines: productLines,
            priceXl: priceXl
        };
        const resMenu = await getRepository(Menu).preload(menu);
        console.log(id);
        return await getRepository(Menu).save(resMenu);
    }

    static async deleteMenu(id: number): Promise<IMessageResponse> {
        const menu = await getRepository(Menu).delete(id);
        return {
            Code: 200,
            Message: "Successful"
        }
    }

    static async deleteProductLineMenu(MenuId: number, ProductLineId: number): Promise<Menu> {
        const productLine = await getRepository(ProductLine).findOne(ProductLineId);
        const menu = await getRepository(Menu).findOne(MenuId);
        menu.productLines = menu.productLines.filter(productLineAll => productLineAll.id !== productLine.id);
        return await getRepository(Menu).save(menu);
    }
}
