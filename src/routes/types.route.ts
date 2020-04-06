import {Request, Response, Router} from "express";
import {RefTypeProduct} from "../entities/RefTypeProduct";
import {TypesController} from "../controllers/TypesController";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {userFromToken} from "../helpers/userHelper";
import {RoleTypes} from "../enums/RoleTypes";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    let isAdmin = false;
    if (req.headers["authorization"]) {
        const token = req.headers["authorization"].split(" ")[1];
        const userFound = await userFromToken(token);
        if (userFound && userFound.role.id === RoleTypes.Admin) {
            isAdmin = true;
        }
    }
    const refTypes: RefTypeProduct[] = await TypesController.getAllRefTypeProduct(isAdmin);
    res.status(200).json(refTypes);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const refTypes = await TypesController.createRefTypeProduct(req.body.label);
    if ((refTypes as IError).Code) {
        res.status((refTypes as IError).Code).json((refTypes as IError).Message);
    } else {
        res.status(201).json(refTypes)
    }

});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const refTypes = await TypesController.updateRefTypeProduct(+req.params.id, req.body.label);
    if ((refTypes as IError).Code) {
        res.status((refTypes as IError).Code).json((refTypes as IError).Message);
    } else {
        res.status(200).json(refTypes)
    }
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const refTypes: IError | ISuccess = await TypesController.deleteRefTypeProduct(+req.params.id);
    res.status(refTypes.Code).json(refTypes.Message);
});

export default router;
