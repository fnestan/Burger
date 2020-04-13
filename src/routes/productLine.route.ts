import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {ProductLineController} from "../controllers/ProductLineController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {IMessageResponse} from "../interfaces/IMessageResponse";

const router = Router();

/**
 * @api {post} /lines/ Request for create productLines
 * @apiName create productLine
 * @apiGroup ProductLine
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {number} desc_size productLine
 * @apiParam {float} price of productLine
 * @apiParam {number} productId of product
 * @apiParam {boolean} orderable of productLine
 *
 * @apiSuccess {ProductLine} return ProductLine
 * @apiError  {string} unauthorize
 */
router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {desc_size, price, orderable, productId} = req.body;
    await VerificationHelper.elementDoesNotExist(+productId, res, "Product");
    VerificationHelper.allRequiredParam(desc_size, +price, orderable, +productId);
    try {
        const productLine = await ProductLineController.createProductLine(desc_size, +price, orderable, +productId);
        res.status(201).json(productLine);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * @api {put} /lines/:id  Request for update productLines
 * @apiName update productLines
 * @apiGroup ProductLines
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {number} desc_size productLine
 * @apiParam {float} price of productLine
 * @apiParam {number} productId of product
 * @apiParam {boolean} orderable of productLine
 *
 * @apiSuccess {ProductLine} return ProductLine
 * @apiError  {string} unauthorize
 */
router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {desc_size, price, orderable, productId} = req.body;
    await VerificationHelper.elementDoesNotExist(+productId, res, "Product");
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "ProductLine");
    VerificationHelper.allRequiredParam(desc_size, +price, orderable, +productId);
    try {
        const productLine = await ProductLineController.updateProductLine(+req.params.id, desc_size, price, orderable, productId);
        res.status(200).json(productLine);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * @api {delete} /lines/:id  Request for delete productLines
 * @apiName delete productLines
 * @apiGroup ProductLines
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {string} return success
 */
router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "ProductLine");
    try {
        const productLine: IMessageResponse = await ProductLineController.deleteProductLine(+req.params.id);
        res.status(productLine.Code).json(productLine.Message);
    } catch (e) {
        res.status(400).json(e);
    }
});
export default router;
