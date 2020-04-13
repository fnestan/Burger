import {getRepository} from "typeorm";
import {Menu} from "../../entities/Menu";

export const menuFromId = async (id: number) => {
    return getRepository(Menu).findOne({
        where: {
            id: id
        }
    });
};
