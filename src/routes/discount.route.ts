import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Discount} from "../entities/Discount";
import {DiscountController} from "../controllers/DiscountController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {IMessageResponse} from "../interfaces/IMessageResponse";

const router = Router();

/**
 * @api {get} /discounts/ Request for get discounts
 * @apiName get discounts
 * @apiGroup Discount
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {Discount} return list of discount
 * @apiError  {string} unauthorize
 */
router.get('/', AdminMiddleware.isAdmin(), async (req: Request, res: Response) => {
    try {
        const discounts: Discount[] = await DiscountController.getAllDiscount();
        res.status(200).json(discounts);
    } catch (e) {
        res.status(400).json(e);
    }

});

/**
 * @api {post} /discounts/ Request for create discount
 * @apiName create discount
 * @apiGroup Discount
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {number} id of menu or producline
 * @apiParam {float} price of discount
 *
 * @apiSuccess {Discount} return discount
 * @apiError  {string} unauthorize
 */
router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {menuId, productLineId, discountPrice} = req.body;
    if (+productLineId && +menuId) {
        res.status(400).json("Vous ne pouvez pas appliquer une promotion sur un menu et un produit")
        return;
    }
    if (menuId) {
        VerificationHelper.allRequiredParam(menuId, discountPrice, res);
        await VerificationHelper.elementDoesNotExist(menuId, res, "Menu");
        await VerificationHelper.discountExistOnMenu(menuId, res);
    }
    if (productLineId) {
        VerificationHelper.allRequiredParam(productLineId, discountPrice, res);
        await VerificationHelper.elementDoesNotExist(productLineId, res, "ProductLine");
        await VerificationHelper.discountExistOnProductLine(productLineId, res);

    }
    if (!menuId && !productLineId) {
        res.status(400).json("Vous devez choisir un menu ou une ligne de produit");
        return;
    }
    try {
        const discount = await DiscountController.createDiscount(+discountPrice, +menuId, +productLineId);
        res.status(201).json(discount);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * @api {put} /discounts/:id  Request for update discount
 * @apiName update discount
 * @apiGroup Discount
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {float} price of discount
 *
 * @apiSuccess {Discount} return discount
 * @apiError  {string} unauthorize
 */
router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {discountPrice} = req.body;
    const {id} = req.params;
    VerificationHelper.allRequiredParam(discountPrice, res);
    await VerificationHelper.elementDoesNotExist(+id, res, "Discount");
    try {
        const discount = await DiscountController.updateDiscount(+id, +discountPrice);
        res.status(200).json(discount);
    } catch (e) {
        res.status(400).json(e);
    }

});

/**
 * @api {delete} /discounts/:id  Request for delete discount
 * @apiName delete discount
 * @apiGroup Discount
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {string} return success
 */
router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {id} = req.params;
    await VerificationHelper.elementDoesNotExist(+id, res, "Discount");
    try {
        const discount: IMessageResponse = await DiscountController.deleteDiscount(+id);
        res.status(discount.Code).json(discount.Message);
    } catch (e) {
        res.status(400).json(e);
    }
});

export default router;
