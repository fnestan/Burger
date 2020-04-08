import {NextFunction, Request, Response, Router} from "express";
import {AuthController} from "../controllers/AuthController";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import bodyParser from "body-parser";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {RoleTypes} from "../enums/RoleTypes";
import {IMessageResponse} from "../interfaces/IMessageResponse";
import {tokentSpit, userFromToken} from "../helpers/queryHelpers/userQueryHelper";

const router = Router();

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
        await AuthController.signUp(firstname, lastname, email, password, role);
    }
});

router.get('/logout', [AdminMiddleware.isLogged()], async (req: Request, res: Response) => {
    try {
        const response = await AuthController.logout(tokentSpit(req.headers['authorization']));
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json(e);

    }

})

export default router;
