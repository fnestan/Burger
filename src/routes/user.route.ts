import {Router} from "express";
import {UserController} from "../controllers/UserController";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Request, Response} from "express";
import {RoleTypes} from "../enums/RoleTypes";
import {userFromToken, userFromEmail} from "../helpers/userHelper";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {getRepository} from "typeorm";
import {Role} from "../entities/Role";
import {User} from "../entities/User";

const router = Router();

router.get('/byRole/:roleType', AdminMiddleware.isAdmin(), async (req: Request, res: Response) => {
    const role = await getRepository(Role).findOne({where: {label: req.params.roleType.toUpperCase()}});
    const users = await UserController.getAllByRole(+req.headers["id"], role.id);
    res.status(200).json(users);

});

router.get('/byId/:id', AdminMiddleware.isLogged(), async (req: Request, res: Response) => {
    const responseUser = await userFromToken(req.headers["authorization"].split(" ")[1]);
    if (responseUser.role.id === RoleTypes.Admin || responseUser.id === +req.params.id) {
        const user = await UserController.getUserById(+req.params.id);
        res.status(200).json(user);
    } else {
        const response: IError = {
            Code: 401,
            Message: "Vous n'êtes pas autorisé à consulter cet utilisateur"
        };
        res.status(response.Code).json(response.Message);
    }
});

router.put('/update/:id', [AdminMiddleware.isLogged(),bodyParser.json()], async (req: Request, res: Response) => {

    if (req.body.firstname &&
        req.body.lastname && req.body.email &&
        req.body.password
    ) {
        const userByEmail = await userFromEmail(req.body.email);
        const userById = await UserController.getUserById(+req.params.id);
        // Si un utilisateur existe avec l'adresse email rentrée (userByEmail)
        // et que un utilisateur existe avec l'id passé en paramètre (userById) et que l'id de userById est différent de l'id de userByEmail
        // l'email existe donc déjà
        if (userByEmail && userById.id !== userByEmail.id) {
            const response: IError = {
                Code: 409,
                Message: "l'email existe déjà"
            };
            res.status(response.Code).json(response.Message);
        } else {
            const responseUser = await userFromToken(req.headers["authorization"].split(" ")[1]);
            if (responseUser.role.id === RoleTypes.Admin || responseUser.id === +req.params.id) {
                const UserSend = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname, email: req.body.email,
                    password: req.body.password
                };
                const user = await UserController.updateUser(+req.params.id, UserSend as User);
                res.status(200).json(user);
            } else {
                const response: IError = {
                    Code: 401,
                    Message: "Vous n'êtes pas autorisé à consulter cet utilisateur"
                };
                res.status(response.Code).json(response.Message);
            }
        }
    }
})

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {

        const response = await UserController.deleteUser(+req.params.id);
        res.status(response.Code).json(response.Message);

})
export default router;
