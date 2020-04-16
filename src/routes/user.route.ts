import {Request, Response, Router} from "express";
import {UserController} from "../controllers/UserController";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {RoleTypes} from "../enums/RoleTypes";
import {tokentSpit, userFromEmail, userFromToken} from "../helpers/queryHelpers/userQueryHelper";
import bodyParser from "body-parser";
import {User} from "../entities/User";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {IMessageResponse} from "../interfaces/IMessageResponse";
import bcrypt from "bcrypt";
import {MailSender} from "../helpers/mail/MailSender";

const router = Router();

/**
 * @api {get} /users/:id Request for get user
 * @apiName get user
 * @apiGroup Users
 * @apiHeader {String} token
 *
 * @apiSuccess {User} return one user
 * @apiError  {string} unauthorize
 */
router.get('/byId/:id', AdminMiddleware.isLogged(), async (req: Request, res: Response) => {
    const responseUser = await userFromToken(tokentSpit(req.headers["authorization"]));
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "User");
    if (elementDoesNotExist) {
        if (responseUser.role.id === RoleTypes.Admin || responseUser.id === +req.params.id) {
            try {
                const user = await UserController.getUserById(+req.params.id);
                res.status(200).json(user);

            } catch (e) {
                res.status(400).json(e);
            }
        } else {
            const response: IMessageResponse = {
                Code: 401,
                Message: "Vous n'êtes pas autorisé à consulter cet utilisateur"
            };
            res.status(response.Code).json(response.Message);
        }
    }
});

/**
 * @api {get} /users/:role Request for get users by role
 * @apiName get users
 * @apiGroup Users
 * @apiHeader {String} token
 *
 * @apiSuccess {User} return list of  user
 * @apiError  {string} unauthorize
 */
router.get('/:role', AdminMiddleware.isAdmin, async (req: Request, res: Response) => {
    const responseUser = await userFromToken(tokentSpit(req.headers["authorization"]));
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.role, res, "Role");
    if (elementDoesNotExist) {
        try {
            const users = await UserController.getAllByRole(responseUser.id, +req.params.role);
            res.status(200).json(users);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});

/**
 * @api {put} /users/:id  Request for update user
 * @apiName update User
 * @apiGroup Users
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {string} firstname of user
 * @apiParam {string} lastname of user
 * @apiParam {string} email of user
 *
 * @apiSuccess {User} return user
 * @apiError  {string} unauthorize
 */
router.put('/update/:id', [AdminMiddleware.isLogged(), bodyParser.json()], async (req: Request, res: Response) => {
    const {firstname, lastname, email} = req.body;
    const allRequireParams = VerificationHelper.allRequiredParam(firstname, lastname, email, res);
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "User");
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
            if (elementDoesNotExist && allRequireParams) {
                const UserSend = {
                    id: +req.params.id,
                    firstname: firstname,
                    lastname: lastname,
                    email: email
                };
                try {
                    const user = await UserController.updateUser(UserSend as User);
                    res.status(200).json(user);
                } catch (e) {
                    res.status(400).json(e);
                }
            }
        } else {
            const response: IMessageResponse = {
                Code: 401,
                Message: "Vous n'êtes pas autorisé à modifier cet utilisateur"
            };
            res.status(response.Code).json(response.Message);
        }
    }
});

/**
 * @api {put} /users/:id  Request for update user password
 * @apiName update User
 * @apiGroup Users
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {string} lastPassword of user
 * @apiParam {string} newPassword of user
 * @apiParam {string} confirmation of user
 *
 * @apiSuccess {User} return user
 * @apiError  {string} unauthorize
 */
router.put("/update/password/:id", bodyParser.json(), AdminMiddleware.isLogged(), async (req: Request, res: Response) => {
    const {lastPassword, newPassword, confirmation} = req.body;
    const allReqquireParams = await VerificationHelper.allRequiredParam(lastPassword, newPassword, confirmation, res);
    const passwordCormimationGood = VerificationHelper.passwordCormimationGood(newPassword, confirmation, res);
    const userLogged = await userFromToken(tokentSpit(req.headers["authorization"]));
    if (!userLogged) {
        res.status(401).json("Tu ne peux pas être la mon grand");
        return;
    }
    const isCorrect: boolean = await bcrypt.compare(newPassword, userLogged.password);
    if (isCorrect) {
        if (allReqquireParams && passwordCormimationGood) {
            const UserSend = {
                id: +req.params.id,
                password: newPassword
            };
            try {
                const user = await UserController.updateUser(UserSend as User);
                res.status(200).json(user);
            } catch (e) {
                res.status(400).json(e);
            }
        }
    } else {
        res.status(400).json("Le mot de passe saisit est incorrect");
        return;
    }
});
/*
pas encore terminé
 */
router.post("/passwordForgot", bodyParser.json(), async (req: Request, res: Response) => {
    const user = await userFromEmail(req.body.email);
    if (!user) {
        res.status(400).json("Ce mail ne correspond à aucun de nos mail");
        return;
    }
    await MailSender.sendMail(req.body.email);
    res.status(200).json("Un mail vous a été envoyer");

});


/**
 * @api {delete} /users/:id  Request for delete user
 * @apiName delete user
 * @apiGroup Users
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {string} return success
 */
router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "User");
    if (elementDoesNotExist) {
        try {
            const response = await UserController.deleteUser(+req.params.id);
            res.status(response.Code).json(response.Message);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});
export default router;
