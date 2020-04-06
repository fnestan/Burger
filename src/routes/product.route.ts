import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {ProductController} from "../controllers/ProductController";
import {RefTypeProduct} from "../entities/RefTypeProduct";
import {ISuccess} from "../interfaces/ISuccess";
import {TypesController} from "../controllers/TypesController";

const router = Router();


router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const product = await ProductController.createProduct(req.body.name, req.body.typeId);
    if ((product as IError).Code) {
        res.status((product as IError).Code).json((product as IError).Message);
    } else {
        res.status(201).json(product)
    }
});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const product = await ProductController.updateProduct(+req.params.id, req.body.name, req.body.typeId);
    if ((product as IError).Code) {
        res.status((product as IError).Code).json((product as IError).Message);
    } else {
        res.status(200).json(product)
    }
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const product: IError | ISuccess = await ProductController.deleteProduct(+req.params.id);
    res.status(product.Code).json(product.Message);
});

export default router;
