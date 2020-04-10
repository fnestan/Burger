import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Forward} from "../entities/Forward";
import {ForwardController} from "../controllers/ForwardController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";

const router = Router();
router.get('/', async (req: Request, res: Response) => {
    const forwaard: Forward[] = await ForwardController.getAllForwards();
    res.status(200).json(forwaard);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {menuId, productLineId, description} = req.body;
    if (+req.body.menuId && +req.body.productLineId) {
        res.status(400).json("Vous ne pouvez pas appliquer une promotion sur un menu et un produit")
        return;
    }
    if (menuId) {
        VerificationHelper.allRequiredParam(menuId, description, res);
        await VerificationHelper.elementDoesNotExist(menuId, res, "Menu");
        await VerificationHelper.forwardExistOnMenu(menuId, res);
    }
    if (productLineId) {
        VerificationHelper.allRequiredParam(productLineId, description, res);
        await VerificationHelper.elementDoesNotExist(productLineId, res, "ProductLine");
        await VerificationHelper.forwardExistOnProductLine(productLineId, res);
    }
    const forward = await ForwardController.createForward(req.body.description, +req.body.menuId, +req.body.productLineId);
    res.status(201).json(forward)

});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Forward");
    const forward = await ForwardController.updateForward(+req.params.id, req.body.description);
    res.status(200).json(forward);
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Forward");
    const forward = await ForwardController.deleteForward(+req.params.id);
    res.status(forward.Code).json(forward.Message);
});

export default router;
