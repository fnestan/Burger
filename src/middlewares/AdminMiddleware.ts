import {tokentSpit, userFromToken} from "../helpers/queryHelpers/userQueryHelper";
import {NextFunction, Request, Response} from "express";
import {RoleTypes} from "../enums/RoleTypes";
import jsonwebtoken from "jsonwebtoken";
import {getRepository} from "typeorm";
import {ResetPasswordUrl} from "../entities/ResetPasswordUrl";


export class AdminMiddleware {

    static isAdmin() {
        return async function (req: Request, res: Response, next: NextFunction) {
            const authorization = req.headers['authorization'];
            let user;
            if (authorization) {
                user = await userFromToken(tokentSpit(authorization));
            }
            if (!user) {
                res.status(403).end();
                return;
            }
            console.log(user);
            if (user.role.id !== RoleTypes.Admin) {
                res.status(403).end();
                return;
            }
            next();
        };
    }

    static canTakeChargeOfOrder() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const authorization = req.headers['authorization'];

            let user;
            if (authorization) {
                user = await userFromToken(tokentSpit(authorization));
            }
            if (!user) {
                res.status(403).end();
                return;
            }
            if (user.role.id !== RoleTypes.OrderPicker && user.role.id !== RoleTypes.Admin) {
                res.status(403).end();
                return;
            }
            next();
        }
    }

    static isOrderPicker() {
        return async function (req: Request, res: Response, next: NextFunction) {
            const authorization = req.headers['authorization'].split(" ")[1];
            let user;
            if (authorization) {
                user = await userFromToken(tokentSpit(authorization));
            }
            if (!user) {
                res.status(403).end();
                return;
            }
            console.log(user);
            if (user.role.id !== RoleTypes.OrderPicker) {
                res.status(403).end();
                return;
            }
            next();
        };
    }

    static isLogged() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const authorization = req.headers['authorization'];
            if (!authorization || !authorization.startsWith('Bearer ')) {
                res.status(401).end();
                return;
            }
            let token;
            try {
                token = <any>jsonwebtoken.verify(tokentSpit(authorization), "secret");
            } catch (error) {
                //If token is not valid, respond with 401 (unauthorized)
                res.status(401).json(error);
                return;
            }
            console.log(token);
            const user = await userFromToken(authorization.split(" ")[1]);
            if (!user) {
                res.status(403).end();
                return;
            }
            res.locals.isLogged = true;
            next();
        };

    }

    static roadIsAccessible() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const road = req.params.road;
            const url = await getRepository(ResetPasswordUrl).findOne({
                where: {
                    url: road,
                    close: false
                }
            });
            if (!url) {
                res.status(400).json("Cette url n'existe pas ou est obsolete");
                return;
            }
            next();
        };

    }
}

/*
1 is is logged == il y a un token && token valid
 */
