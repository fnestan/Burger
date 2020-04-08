import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {OrderController} from "../controllers/OrderController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {tokentSpit} from "../helpers/queryHelpers/userQueryHelper";

const router = Router();

router.put('/:orderId', [bodyParser.json(), AdminMiddleware.canTakeChargeOfOrder()], async (req: Request, res: Response) => {
    const {userId} = req.body;
    await VerificationHelper.elementDoesNotExist(+userId, res, "User");
    await VerificationHelper.elementDoesNotExist(+req.params.orderId, res, "Order");
    const order = await OrderController.setResponsibleOfOrder(+req.params.orderId, +userId);
    res.status(201).json(order);
});

// orderCustomerId?: number, menuIds?: [{ menuId: number, xl: boolean }], productLineIds?: number[]
router.post('/', [bodyParser.json()], async (req: Request, res: Response) => {
    const {orderCustomerId, menuIds, productLineIds} = req.body;
    const order = await OrderController.createOrder(+orderCustomerId, menuIds, productLineIds);
    res.status(201).json(order);
});

router.get('/', [bodyParser.json(), AdminMiddleware.isLogged()], async (req: Request, res: Response) => {
    const token = tokentSpit(req.headers.authorization);
    const orders = await OrderController.getCustomerOrders(token);
    res.status(201).json(orders);
});

export default router;
