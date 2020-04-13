import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {ProductController} from "../controllers/ProductController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {RefTypeProduct} from "../entities/RefTypeProduct";

const router = Router();

/**
 * @api {post} /products/ Request for create product
 * @apiName create product
 * @apiGroup Products
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {number} id of ref type
 * @apiParam {string} name of product
 *
 * @apiSuccess {Product} return product
 * @apiError  {string} unauthorize
 */
router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.name, req.body.typeId, res);
    await VerificationHelper.elementDoesNotExist(req.body.typeId, res, "RefTypeProduct");
    try {
        const product = await ProductController.createProduct(req.body.name, req.body.typeId);
        res.status(201).json(product);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * @api {put} /products/:id  Request for update product
 * @apiName update product
 * @apiGroup Products
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {number} id of ref type
 * @apiParam {string} name of product
 *
 * @apiSuccess {Ingredient} return ingredient
 * @apiError  {string} unauthorize
 */
router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.name, req.body.typeId, res);
    await VerificationHelper.elementDoesNotExist(req.body.typeId, res, "RefTypeProduct");
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Product");
    try {
        const product = await ProductController.updateProduct(+req.params.id, req.body.name, req.body.typeId);
        res.status(200).json(product);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * @api {delete} /products/:id  Request for delete product
 * @apiName delete product
 * @apiGroup Products
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {string} return success
 */
router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.elementDoesNotExist(+req.params.id, res, "Product");
    try {
        const product = await ProductController.deleteProduct(+req.params.id);
        res.status(product.Code).json(product.Message);
    } catch (e) {
        res.status(400).json(e);
    }
});

export default router;
