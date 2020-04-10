import {Request, Response, Router} from "express";
import {UserController} from "../controllers/UserController";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {RoleTypes} from "../enums/RoleTypes";
import {tokentSpit, userFromEmail, userFromToken} from "../helpers/queryHelpers/userQueryHelper";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {User} from "../entities/User";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {IMessageResponse} from "../interfaces/IMessageResponse";

const router = Router();


router.get('/byId/:id', AdminMiddleware.isLogged(), async (req: Request, res: Response) => {
    const responseUser = await userFromToken(tokentSpit(req.headers["authorization"]));
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "User");
    if (responseUser.role.id === RoleTypes.Admin || responseUser.id === +req.params.id) {
        const user = await UserController.getUserById(+req.params.id);
        res.status(200).json(user);
    } else {
        const response: IMessageResponse = {
            Code: 401,
            Message: "Vous n'êtes pas autorisé à consulter cet utilisateur"
        };
        res.status(response.Code).json(response.Message);
    }
});

router.put('/update/:id', [AdminMiddleware.isLogged(), bodyParser.json()], async (req: Request, res: Response) => {
    const {firstname, lastname, email, password} = req.body;
    VerificationHelper.allRequiredParam(firstname, lastname, email, password, res);
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "User");
    const userByEmail = await userFromEmail(email);
    const userById = await UserController.getUserById(+req.params.id);
    // Si un utilisateur existe avec l'adresse email rentrée (userByEmail)
    // et que un utilisateur existe avec l'id passé en paramètre (userById) et que l'id de userById est différent de l'id de userByEmail
    // l'email existe donc déjà
    if (userByEmail && userById.id !== userByEmail.id) {
        const response: IMessageResponse = {
            Code: 409,
            Message: "l'email existe déjà"
        };
        res.status(response.Code).json(response.Message);
    } else {
        const responseUser = await userFromToken(tokentSpit(req.headers["authorization"]));
        if (responseUser.role.id === RoleTypes.Admin || responseUser.id === +req.params.id) {
            const UserSend = {
                firstname: req.body.firstname,
                lastname: req.body.lastname, email: req.body.email,
                password: req.body.password
            };
            const user = await UserController.updateUser(+req.params.id, UserSend as User);
            res.status(200).json(user);
        } else {
            const response: IMessageResponse = {
                Code: 401,
                Message: "Vous n'êtes pas autorisé à modifier cet utilisateur"
            };
            res.status(response.Code).json(response.Message);
        }
    }
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "User");
    const response = await UserController.deleteUser(+req.params.id);
    res.status(response.Code).json(response.Message);

})
export default router;
