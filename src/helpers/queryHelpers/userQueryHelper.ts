import {User} from "../../entities/User";
import {getRepository} from "typeorm";
import {Role} from "../../entities/Role";
import {Menu} from "../../entities/Menu";
import {ProductLine} from "../../entities/ProductLine";
import {Discount} from "../../entities/Discount";

export const userFromToken = (token: string) => {
    return getRepository(User).findOne({
        where: {
            token
        }
    });
};
export const userFromEmail = async (email: string) => {
    return getRepository(User).findOne({
        where: {
            email
        }
    });
};
export const roleFromId = async (id: number) => {
    return getRepository(Role).findOne({
        where: {
            id: id
        }
    });
};

export const productLineFromId = async (id: number) => {
    return getRepository(ProductLine).findOne({
        where: {
            id: id
        }
    });
};

export const tokentSpit = (token: string) => {
    return token.split(" ")[1];
};


