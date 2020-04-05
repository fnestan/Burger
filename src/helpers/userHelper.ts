import {User} from "../entities/User";
import {getRepository} from "typeorm";

export const userFromToken = (token: string) => {
    return getRepository(User).findOne({
        where: {
            token
        }
    });
}
export const userFromEmail = async (email: string) => {
   return  getRepository(User).findOne({
        where: {
            email
        }
    });
}


