import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Forward} from "../entities/Forward";
import {ForwardController} from "../controllers/ForwardController";

const router = Router();

router.get('/', async (req: Request, res: Response) => {

    const forwaard: Forward[] = await ForwardController.getAllForwards();
    res.status(200).json(forwaard);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    if (+req.body.menuId && +req.body.productLineId) {
        res.status(400).json("Vous ne pouvez pas appliquer une promotion sur un menu et un produit")
        return;
    }
    const forward = await ForwardController.createForward(req.body.description, +req.body.menuId, +req.body.productLineId);
    res.status(201).json(forward)

});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const forward = await ForwardController.updateForward(+req.params.id, req.body.description);
    if ((forward as IError).Code) {
        res.status((forward as IError).Code).json((forward as IError).Message);
    } else {
        res.status(200).json(forward);
    }
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const forward: IError | ISuccess = await ForwardController.deleteForward(+req.params.id);
    res.status(forward.Code).json(forward.Message);
});

export default router;
