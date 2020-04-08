import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Unit} from "../entities/Unit";
import {UnitController} from "../controllers/UnitController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";

const router = Router();

router.get('/', AdminMiddleware.isAdmin(), async (req: Request, res: Response) => {
    const units: Unit[] = await UnitController.getAllUnits();
    res.status(200).json(units);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.name, res);
    const units = await UnitController.createUnit(req.body.name);
    res.status(201).json(units)
});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.name, res);
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Unit");
    const units = await UnitController.updateUnit(+req.params.id, req.body.name);
    if ((units as IError).Code) {
        res.status((units as IError).Code).json((units as IError).Message);
    } else {
        res.status(200).json(units);
    }
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Unit");
    const units: IError | ISuccess = await UnitController.deleteUnit(+req.params.id);
    res.status(units.Code).json(units.Message);
});

export default router;
