import {getRepository} from "typeorm";
import {Discount} from "../../entities/Discount";
import {ProductLine} from "../../entities/ProductLine";
import {Menu} from "../../entities/Menu";


export const discoutFromProductLineId = async (productLineId: number) => {
    const productLine = await getRepository(ProductLine).findOne({id: productLineId})
    return getRepository(Discount).findOne({
        where: {
            productLine: productLine
        }
    });
};

export const discoutFromMenuId = async (id: number) => {
    const menu = await getRepository(Menu).findOne({id})
    return getRepository(Discount).findOne({
        where: {
            menu: menu
        }
    });
};
