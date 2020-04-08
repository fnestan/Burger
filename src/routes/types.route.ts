import {Request, Response, Router} from "express";
import {RefTypeProduct} from "../entities/RefTypeProduct";
import {TypesController} from "../controllers/TypesController";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {tokentSpit, userFromToken} from "../helpers/queryHelpers/userQueryHelper";
import {RoleTypes} from "../enums/RoleTypes";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    let isAdmin = false;
    if (req.headers["authorization"]) {
        const token = tokentSpit(req.headers["authorization"]);
        const userFound = await userFromToken(token);
        if (userFound && userFound.role.id === RoleTypes.Admin) {
            isAdmin = true;
        }
    }
    const refTypes: RefTypeProduct[] = await TypesController.getAllRefTypeProduct(isAdmin);
    res.status(200).json(refTypes);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.label);
    const refTypes = await TypesController.createRefTypeProduct(req.body.label);
    res.status(201).json(refTypes);
});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.label);
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "RefTypeProduct");
    const refTypes = await TypesController.updateRefTypeProduct(+req.params.id, req.body.label);
    res.status(200).json(refTypes)
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const refTypes: IError | ISuccess = await TypesController.deleteRefTypeProduct(+req.params.id);
    res.status(refTypes.Code).json(refTypes.Message);
});

export default router;
