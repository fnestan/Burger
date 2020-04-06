import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Discount} from "../entities/Discount";
import {DiscountController} from "../controllers/DiscountController";

const router = Router();

router.get('/', AdminMiddleware.isAdmin(), async (req: Request, res: Response) => {

    const discounts: Discount[] = await DiscountController.getAllDiscount();
    res.status(200).json(discounts);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    if (+req.body.menuId && +req.body.productLineId) {
        res.status(400).json("Vous ne pouvez pas appliquer une promotion sur un menu et un produit")
        return;
    }
    const discount = await DiscountController.createDiscount(+req.body.discountPrice, +req.body.menuId, +req.body.productLineId);
    res.status(201).json(discount)

});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const discount = await DiscountController.updateDiscount(+req.params.id, +req.body.discountPrice);
    if ((discount as IError).Code) {
        res.status((discount as IError).Code).json((discount as IError).Message);
    } else {
        res.status(200).json(discount);
    }
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const discount: IError | ISuccess = await DiscountController.deleteDiscount(+req.params.id);
    res.status(discount.Code).json(discount.Message);
});

export default router;
