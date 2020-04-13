import {Equal, getRepository, Not} from "typeorm";
import {Role} from "../entities/Role";
import {User} from "../entities/User";
import {IMessageResponse} from "../interfaces/IMessageResponse";

export class UserController {

    static async getAllByRole(excludedId: number, roleType: number): Promise<User[]> {
        const role = await getRepository(Role).findOne({
                id: roleType
            }
        );
        return await getRepository(User).find({
            role: role,
            id: Not(Equal(excludedId))
        });
    }

    static async getUserById(searchId: number): Promise<User> {
        return await getRepository(User).findOne({
            id: searchId
        });
    }

    static async updateUser(id: number, user: User): Promise<User> {
        return await getRepository(User).save({
            ...await getRepository(User).findOne(id),
            ...user
        });
    }

    static async deleteUser(id: number): Promise<IMessageResponse> {
        let userResult = await getRepository(User).delete({
            id: id
        });
        if (userResult) {
            return {
                Message: "Utilisateur supprimé avec succès",
                Code: 200
            };
        }
        return {
            Message: "L'utilisateur n'existe pas",
            Code: 400
        };
    }
}
