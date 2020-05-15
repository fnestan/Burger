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
router.get('/', async (req: Request, res: Response) => {
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
    let allRequiredParam, elementDoesNotExist;
    if (menuId) {
        allRequiredParam = VerificationHelper.allRequiredParam(menuId, discountPrice, res);
        elementDoesNotExist = await VerificationHelper.elementDoesNotExist(menuId, res, "Menu");
        const discountExistOnMenu = await VerificationHelper.discountExistOnMenu(menuId, res);
        if (!discountExistOnMenu) {
            return;
        }
    }
    if (productLineId) {
        allRequiredParam = VerificationHelper.allRequiredParam(productLineId, discountPrice, res);
        elementDoesNotExist = await VerificationHelper.elementDoesNotExist(productLineId, res, "ProductLine");
        const discountExistOnProductLine = await VerificationHelper.discountExistOnProductLine(productLineId, res);
        if (!discountExistOnProductLine) {
            return;
        }

    }
    if (!menuId && !productLineId) {
        res.status(400).json("Vous devez choisir un menu ou une ligne de produit");
        return;
    }
    if (allRequiredParam && elementDoesNotExist) {
        try {
            const discount = await DiscountController.createDiscount(+discountPrice, +menuId, +productLineId);
            res.status(201).json(discount);
        } catch (e) {
            res.status(400).json(e);
        }
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
    const {discount} = req.body;
    const {id} = req.params;
    let allRequiredParam, elementDoesNotExist;

    allRequiredParam = VerificationHelper.allRequiredParam(discount, res);
    elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+id, res, "Discount");
    if (allRequiredParam && elementDoesNotExist) {
        try {
            const d = await DiscountController.updateDiscount(+id, +discount);
            res.status(200).json(d);
        } catch (e) {
            res.status(400).json(e);
        }
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

    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+id, res, "Discount");
    if (elementDoesNotExist) {
        try {
            const discount: IMessageResponse = await DiscountController.deleteDiscount(+id);
            res.status(discount.Code).json(discount.Message);
        } catch (e) {
            res.status(400).json(e);
        }
    }

});

export default router;
