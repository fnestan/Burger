import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Discount} from "../entities/Discount";
import {DiscountController} from "../controllers/DiscountController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {IMessageResponse} from "../interfaces/IMessageResponse";

const router = Router();

router.get('/', AdminMiddleware.isAdmin(), async (req: Request, res: Response) => {
    const discounts: Discount[] = await DiscountController.getAllDiscount();
    res.status(200).json(discounts);
});

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
    const discount = await DiscountController.createDiscount(+discountPrice, +menuId, +productLineId);
    res.status(201).json(discount)

});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {discountPrice} = req.body;
    const {id} = req.params;
    VerificationHelper.allRequiredParam(discountPrice, res);
    await VerificationHelper.elementDoesNotExist(+id, res, "Discount");
    const discount = await DiscountController.updateDiscount(+id, +discountPrice);
    res.status(200).json(discount);
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {id} = req.params;
    await VerificationHelper.elementDoesNotExist(+id, res, "Discount");
    const discount: IMessageResponse = await DiscountController.deleteDiscount(+id);
    res.status(discount.Code).json(discount.Message);
});

export default router;
