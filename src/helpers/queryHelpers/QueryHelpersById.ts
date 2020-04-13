import {createQueryBuilder, getRepository} from "typeorm";
import {Menu} from "../../entities/Menu";


export const entityFromId = async (id: number, entityName: string) => {
    return createQueryBuilder(entityName).where(entityName + ".id = :id", {id: id})
        .getOne();
};
