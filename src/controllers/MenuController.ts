import {IError} from "../interfaces/IError";
import {getRepository} from "typeorm";
import {ISuccess} from "../interfaces/ISuccess";
import {ProductLine} from "../entities/ProductLine";
import {Menu} from "../entities/Menu";

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


    static async createMenu(name: string, price: number, orderable: boolean, productLineIds: number[]): Promise<Menu | IError> {
        const productLines: ProductLine[] = await getRepository(ProductLine).findByIds(productLineIds);
        try {
            const menu: Menu = await getRepository(Menu).create({
                name: name,
                price: price,
                orderable: orderable
            });
            menu.productLines = productLines;
            return await getRepository(Menu).save(menu);

        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async updateMenu(id: number, name: string, price: number, orderable: boolean, productLineIds: number[]): Promise<Menu | IError> {
        const productLines: ProductLine[] = await getRepository(ProductLine).findByIds(productLineIds);
        try {
            const menu = {
                id: id,
                name: name,
                price: price,
                orderable: orderable,
                productLines: productLines
            };
            const resMenu = await getRepository(Menu).preload(menu);
            console.log(id);
            return await getRepository(Menu).save(resMenu);
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async deleteMenu(id: number): Promise<ISuccess | IError> {
        try {
            const menu = await getRepository(Menu).delete(id);
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

    static async deleteProductLineMenu(MenuId: number, ProductLineId: number): Promise<Menu | IError> {
        const productLine = await getRepository(ProductLine).findOne(ProductLineId);
        const menu = await getRepository(Menu).findOne(MenuId);
        if (!menu || !productLine) {
            return {
                Code: 400,
                Message: "Le Menu ou la ligne de produit n'existe pas"
            };
        }
        menu.productLines = menu.productLines.filter(productLineAll => productLineAll.id !== productLine.id);
        return await getRepository(Menu).save(menu);
    }
}
