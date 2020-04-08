import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {ProductLineController} from "../controllers/ProductLineController";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";

const router = Router();

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {desc_size, price, orderable, productId} = req.body;
    await VerificationHelper.elementDoesNotExist(+productId, res, "Product");
    VerificationHelper.allRequiredParam(desc_size, +price, orderable, +productId);
    const productLine = await ProductLineController.createProductLine(desc_size, +price, orderable, +productId);
    if ((productLine as IError).Code) {
        res.status((productLine as IError).Code).json((productLine as IError).Message);
    } else {
        res.status(201).json(productLine)
    }
});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {desc_size, price, orderable, productId} = req.body;
    await VerificationHelper.elementDoesNotExist(+productId, res, "Product");
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "ProductLine");
    VerificationHelper.allRequiredParam(desc_size, +price, orderable, +productId);
    const productLine = await ProductLineController.updateProductLine(+req.params.id, desc_size, price, orderable, productId);
    res.status(200).json(productLine);
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "ProductLine");
    const productLine: IError | ISuccess = await ProductLineController.deleteProductLine(+req.params.id);
    res.status(productLine.Code).json(productLine.Message);
});
export default router;
