import {getRepository} from "typeorm";
import {ProductLine} from "../../entities/ProductLine";
import {Discount} from "../../entities/Discount";
import {Menu} from "../../entities/Menu";
import {Forward} from "../../entities/Forward";

export const forwardFromProductLineId = async (productLineId: number) => {
    const productLine = await getRepository(ProductLine).findOne({id: productLineId})
    return getRepository(Forward).findOne({
        where: {
            productLine: productLine
        }
    });
};

export const forwardFromMenuId = async (id: number) => {
    const menu = await getRepository(Menu).findOne({id})
    return getRepository(Forward).findOne({
        where: {
            menu: menu
        }
    });
};
