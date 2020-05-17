import {Request, Response, Router} from "express";
import {Unit} from "../entities/Unit";
import {UnitController} from "../controllers/UnitController";

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
router.get('/', async (req: Request, res: Response) => {
    try {
        const units: Unit[] = await UnitController.getAllUnits();
        res.status(200).json(units);
    } catch (e) {
        res.status(400).json(e);
    }

});

export default router;
