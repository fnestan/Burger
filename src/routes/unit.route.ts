import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Unit} from "../entities/Unit";
import {UnitController} from "../controllers/UnitController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {IMessageResponse} from "../interfaces/IMessageResponse";

const router = Router();

/**
 * @api {get} /units/ Request for get units
 * @apiName get units
 * @apiGroup Units
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {Units} return list of Units
 * @apiError  {string} unauthorize
 */
router.get('/', AdminMiddleware.isAdmin(), async (req: Request, res: Response) => {
    try {
        const units: Unit[] = await UnitController.getAllUnits();
        res.status(200).json(units);
    } catch (e) {
        res.status(400).json(e);
    }

});

/**
 * @api {post} /units/ Request for create Unit
 * @apiName create Unit
 * @apiGroup Units
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {string} name of Unit
 *
 * @apiSuccess {Units} return Unit
 * @apiError  {string} unauthorize
 */
router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.name, res);
    try {
        const units = await UnitController.createUnit(req.body.name);
        res.status(201).json(units);
    } catch (e) {
        res.status(400).json(e);

    }
});

/**
 * @api {put} /units/:id  Request for update Unit
 * @apiName update Unit
 * @apiGroup Units
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {string} name of unit
 *
 * @apiSuccess {Unit} return unit
 * @apiError  {string} unauthorize
 */
router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.name, res);
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Unit");
    try {
        const units = await UnitController.updateUnit(+req.params.id, req.body.name);
        res.status(200).json(units);
    } catch (e) {
        res.status(400).json(e);

    }
});

/**
 * @api {delete} /units/:id  Request for delete unit
 * @apiName delete unit
 * @apiGroup Units
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {string} return success
 */
router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Unit");

    try {
        const units: IMessageResponse = await UnitController.deleteUnit(+req.params.id);
        res.status(units.Code).json(units.Message);
    } catch (e) {
        res.status(400).json(e);
    }
});

export default router;
