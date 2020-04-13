import {NextFunction, Request, Response, Router} from "express";
import {AuthController} from "../controllers/AuthController";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import bodyParser from "body-parser";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {RoleTypes} from "../enums/RoleTypes";
import {IMessageResponse} from "../interfaces/IMessageResponse";
import {tokentSpit, userFromToken} from "../helpers/queryHelpers/userQueryHelper";

const router = Router();
/**
 * @api {post} /auth/login Request for login
 * @apiName login
 * @apiGroup Auth
 *
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSuccess {User} return user with token
 * @apiError  {string} return error response
 */
router.post('/login', bodyParser.json(), async (req: Request, res: Response) => {
    const {email, password} = req.body;
    VerificationHelper.allRequiredParam(email, password, res);
    try {
        const user = await AuthController.login(email, password);
        if ((user as IMessageResponse).Code) {
            res.status((user as IMessageResponse).Code).json((user as IMessageResponse).Message);
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).end();
    }
});

/**
 * @api {post} /auth/signUp Request for signup
 * @apiName signUp
 * @apiGroup Auth
 *
 * @apiParam {String} firstname
 * @apiParam {String} email
 * @apiParam {String} lastname
 * @apiParam {String} password
 * @apiParam {String} passwordConfirm
 * @apiParam {number} roleId
 *
 * @apiSuccess {User} return user
 * @apiError  {string} return error response
 */
router.post('/signUp', bodyParser.json(), async (req: Request, res: Response, next: NextFunction) => {
    const {firstname, email, lastname, password, passwordConfirm, roleId} = req.body;
    VerificationHelper.allRequiredParam(firstname, email, lastname, password, passwordConfirm, roleId, res);
    VerificationHelper.passwordCormimationGood(password, passwordConfirm, res);
    await VerificationHelper.elementDoesNotExist(roleId, res, "Role");
    await VerificationHelper.emailAlreadyExiest(email, res);
    const authorization = req.headers['authorization'];
    let role;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        role = RoleTypes.Customer;
    } else {
        const token = tokentSpit(req.headers['authorization']);
        const result = await userFromToken(token);
        if (result) {
            VerificationHelper.cannotCreteUser(result, res);
        } else {
            role = roleId;
        }
    }
    try {
        const user = await AuthController.signUp(firstname, lastname, email, password, role);
        res.status(201).json(user);
    } catch (e) {
        res.status(400).json(e);

    }

});

/**
 * @api {get} /auth/signUp Request for logout
 * @apiName logout
 * @apiGroup Auth

 *
 * @apiSuccess {User} return user
 * @apiError  {string} return error response
 */
router.get('/logout', AdminMiddleware.isLogged(), async (req: Request, res: Response) => {
    console.log(tokentSpit(req.headers['authorization']));
    try {
        const response = await AuthController.logout(tokentSpit(req.headers['authorization']));
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json(e);
    }

});

export default router;
