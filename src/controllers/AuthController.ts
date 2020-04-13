import {User} from "../entities/User";
import {getConnectionManager, getRepository, Repository} from "typeorm";
import bcrypt, {compare} from "bcrypt";
import {validate, ValidationError} from "class-validator";
import jsonwebtoken from "jsonwebtoken";
import {Role} from "../entities/Role";
import {IMessageResponse} from "../interfaces/IMessageResponse";
import {userFromToken} from "../helpers/queryHelpers/userQueryHelper";

export class AuthController {

    static async signUp(firstname: string, lastname: string, email: string, password: string, roleId: number): Promise<User | ValidationError[]> {
        const role = await getRepository(Role).findOne({id: roleId});
        const user = await getRepository(User).create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: await bcrypt.hash(password, 10),
            role: role
        });
        const errors = await validate(user, {validationError: {target: false}});
        if (errors.length === 0) {
            return getRepository(User).save(user);
        } else {
            return errors;
        }

    }

    static async login(email: string, password: string): Promise<User | IMessageResponse> {
        const userFound = await getRepository(User).findOne({
            email: email,
        });
        if (userFound) {
            const isCorrect: boolean = await bcrypt.compare(password, userFound.password);
            if (isCorrect) {
                const token = jsonwebtoken.sign({
                        email: userFound.email,
                        userId: userFound.id,
                        role: userFound.role

                    },
                    'secret',
                    {
                        expiresIn: "1h"
                    }
                );
                userFound.token = token;

                return await getRepository(User).save(userFound);
            }
        }
        return {
            Code: 400, Message:
                "L' email ou le mot de passe est incorrect"
        };
    }

    static async logout(token: string): Promise<IMessageResponse> {
        const user = await userFromToken(token);
        if (!user) {
            return null;
        }

        user.token = "";
        await getRepository(User).save(user);

        return {
            Message: "Déconnecté avec succès",
            Code: 200
        }
    }
}
