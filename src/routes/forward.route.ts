import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Forward} from "../entities/Forward";
import {ForwardController} from "../controllers/ForwardController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";

const router = Router();

/**
 * @api {get} /forwards/ Request for get forwards
 * @apiName get forwards
 * @apiGroup Forwards
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {Forwards} return list of forward
 * @apiError  {string} unauthorize
 */
router.get('/', async (req: Request, res: Response) => {
    const forwaard: Forward[] = await ForwardController.getAllForwards();
    res.status(200).json(forwaard);
});


/**
 * @api {post} /forwards/ Request for create forward
 * @apiName create forward
 * @apiGroup Forwards
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {number} id of menu or producline
 * @apiParam {string} description of forward
 *
 * @apiSuccess {Forwards} return forward
 * @apiError  {string} unauthorize
 */
router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {menuId, productLineId, description} = req.body;
    let allRequiredParam, elementDoesNotExist;
    if (+req.body.menuId && +req.body.productLineId) {
        res.status(400).json("Vous ne pouvez pas appliquer une mis en avant sur un menu et un produit")
        return;
    }
    if (menuId) {
        allRequiredParam = VerificationHelper.allRequiredParam(menuId, description, res);
        elementDoesNotExist = await VerificationHelper.elementDoesNotExist(menuId, res, "Menu");
        const forwardExistOnMenu = await VerificationHelper.forwardExistOnMenu(menuId, res);
        if (forwardExistOnMenu) {
            return;
        }
    }
    if (productLineId) {
        allRequiredParam = VerificationHelper.allRequiredParam(productLineId, description, res);
        elementDoesNotExist = await VerificationHelper.elementDoesNotExist(productLineId, res, "ProductLine");
        const forwardExistOnProductLine = await VerificationHelper.forwardExistOnProductLine(productLineId, res);
        if (forwardExistOnProductLine) {
            return;
        }
    }
    if (!menuId && !productLineId) {
        res.status(400).json("Vous devez choisir un menu ou une ligne de produit");
        return;
    }
    if (allRequiredParam && elementDoesNotExist) {
        try {
            const forward = await ForwardController.createForward(req.body.description, +req.body.menuId, +req.body.productLineId);
            res.status(201).json(forward);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});

/**
 * @api {put} /forwards/:id  Request for update forward
 * @apiName update forward
 * @apiGroup Forward
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {float} price of forward
 *
 * @apiSuccess {Forward} return forward
 * @apiError  {string} unauthorize
 */
router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Forward");
    if (elementDoesNotExist) {
        try {
            const forward = await ForwardController.updateForward(+req.params.id, req.body.description);
            res.status(200).json(forward);
        } catch (e) {
            res.status(400).json(e);
        }
    }

});

/**
 * @api {delete} /forwards/:id  Request for delete forward
 * @apiName delete forward
 * @apiGroup Forward
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {string} return success
 */
router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Forward");
    if (elementDoesNotExist) {
        try {
            const forward = await ForwardController.deleteForward(+req.params.id);
            res.status(forward.Code).json(forward.Message);
        } catch (e) {
            res.status(400).json(e);
        }
    }

});

export default router;
