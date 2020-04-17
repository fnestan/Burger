import {Equal, getRepository, Not} from "typeorm";
import {Role} from "../entities/Role";
import {User} from "../entities/User";
import {IMessageResponse} from "../interfaces/IMessageResponse";
import {ResetPasswordUrl} from "../entities/ResetPasswordUrl";
import randomstring from "randomstring";
import {MailSender} from "../helpers/mail/MailSender";
import bcrypt from "bcrypt";


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

    static async updateUser(user: User): Promise<User> {
        const resUser = await getRepository(User).preload(user);
        return await getRepository(User).save(resUser);
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

    static async passwordForgot(user: User): Promise<IMessageResponse> {
        const chaine = randomstring.generate({
            length: 50,
            charset: 'alphabetic'
        });
        const pass = getRepository(ResetPasswordUrl).create({
            close: false,
            user: user,
            url: chaine
        });
        await getRepository(ResetPasswordUrl).save(pass);
        await MailSender.sendMail(user.email, chaine);
        return {
            Code: 200,
            Message: "Un email vous a été envoyer. "
        }
    }

    static async resetPassword(road: string, password: string): Promise<IMessageResponse> {
        const url = await getRepository(ResetPasswordUrl).findOne({
            where: {
                url: road,
                close: false
            }
        });
        console.log(url);
        try {
            const user = await getRepository(User).findOne(url.user.id);
            user.password = await bcrypt.hash(password, 10);
            await getRepository(User).save(user);
            url.close = true;
            getRepository(ResetPasswordUrl).save(url);
            return {
                Code: 200,
                Message: "Votre mot de passe à bien été modifier"
            }
        } catch (e) {
            console.log(e);
            return {
                Code: 400,
                Message: "Ca ne marche pas ducon"
            }
        }

    }
}
