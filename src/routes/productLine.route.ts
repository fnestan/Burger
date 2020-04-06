import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {ProductLineController} from "../controllers/ProductLineController";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";

const router = Router();

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const productLine = await ProductLineController.createProductLine(req.body.desc_size, +req.body.price, req.body.orderable, req.body.productId);
    if ((productLine as IError).Code) {
        res.status((productLine as IError).Code).json((productLine as IError).Message);
    } else {
        res.status(201).json(productLine)
    }
});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const productLine = await ProductLineController.updateProductLine(+req.params.id, req.body.desc_size, req.body.price, req.body.orderable, req.body.productId);
    if ((productLine as IError).Code) {
        res.status((productLine as IError).Code).json((productLine as IError).Message);
    } else {
        res.status(200).json(productLine)
    }
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const productLine: IError | ISuccess = await ProductLineController.deleteProductLine(+req.params.id);
    res.status(productLine.Code).json(productLine.Message);
});
export default router;
