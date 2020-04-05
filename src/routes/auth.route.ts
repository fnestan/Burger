import {Router} from "express";
import {AuthController} from "../controllers/AuthController";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Request, Response} from "express";
import {RoleTypes} from "../enums/RoleTypes";
import {userFromEmail, userFromToken} from "../helpers/userHelper";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {UserController} from "../controllers/UserController";

const router = Router();

router.post('/login', bodyParser.json(), async (req: Request, res: Response) => {
    if (req.body.email &&
        req.body.password
    ) {
        try {
            const user = await AuthController.login(req.body.email, req.body.password);
            if((user as IError).Code){
                res.status((user as IError).Code).json((user as IError).Message);
            }else {
                res.json(user);
            }
        } catch (err) {
            res.status(500).end();
        }
    } else {
        res.status(400).json("les champs sont requis");
    }
});

router.post('/signUp', bodyParser.json(), async (req: Request, res: Response) => {
    if (req.body.firstname &&
        req.body.lastname && req.body.email &&
        req.body.password && req.body.roleId
    ) {
        const userByEmail = await userFromEmail(req.body.email);
        if (userByEmail) {
            const response: IError = {
                Code: 409,
                Message: "l'email existe déjà"
            };
            res.status(response.Code).json(response.Message);
        } else {
        const authorization = req.headers['authorization'];
        let role;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            role = RoleTypes.Customer;
        } else {
            const result = await userFromToken(authorization);
            if (!result || result.role.id === RoleTypes.Customer || result.role.id === RoleTypes.OrderPicker) {
                res.status(401).json("Vous ne pouvez pas créer de nouvel utilisateur");
            } else {
                role = req.body.roleId;
            }
        }
        try {
            const user = await AuthController.signUp(req.body.firstname,
                req.body.lastname, req.body.email,
                req.body.password, role)
            res.status(201).json(user)
        } catch (e) {
            res.status(500).json(e);
        }
    }
    } else {
        res.status(400).json("les champs sont requis");
    }
});

router.get('/logout', [AdminMiddleware.isLogged()], async (req: Request, res: Response) => {
    try {
        const response = await AuthController.logout(req.headers['authorization'].split(" ")[1]);
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json(e);

    }

})

export default router;
