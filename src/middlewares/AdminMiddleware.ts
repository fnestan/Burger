import {AuthController} from "../controllers/AuthController";
import {tokentSpit, userFromToken} from "../helpers/queryHelpers/userQueryHelper";
import {Request, Response, NextFunction} from "express";
import {RoleTypes} from "../enums/RoleTypes";
import jsonwebtoken from "jsonwebtoken";


export class AdminMiddleware {

    static isAdmin() {
        return async function (req: Request, res: Response, next: NextFunction) {
            const authorization = req.headers['authorization'].split(" ")[1];
            const user = await userFromToken(authorization);
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
            const authorization = req.headers['authorization'].split(" ")[1];
            const user = await userFromToken(authorization);
            if (!user) {
                res.status(403).end();
                return;
            }
            console.log(user);
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
            const user = await userFromToken(authorization);
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
                token = <any>jsonwebtoken.verify(authorization.split(" ")[1], "secret");
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
}

/*
1 is is logged == il y a un token && token valid
 */
