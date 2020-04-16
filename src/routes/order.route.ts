import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {OrderController} from "../controllers/OrderController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {tokentSpit} from "../helpers/queryHelpers/userQueryHelper";

const router = Router();

/**
 * @api {put} /orders/:orderId  Request for update orders
 * @apiName update order
 * @apiGroup Orders
 * @apiHeader {String} token order picker & admin
 * @apiPermission role order picker & admin
 *
 * @apiParam {number} id of user
 *
 * @apiSuccess {orders} return order
 * @apiError  {string} unauthorize
 */
router.put('/:orderId', [bodyParser.json(), AdminMiddleware.canTakeChargeOfOrder()], async (req: Request, res: Response) => {
    const {userId} = req.body;
    const elementDoesNotExistUser = await VerificationHelper.elementDoesNotExist(+userId, res, "User");
    const elementDoesNotExistOrder = await VerificationHelper.elementDoesNotExist(+req.params.orderId, res, "Order");
    if (elementDoesNotExistUser && elementDoesNotExistOrder) {
        try {
            const order = await OrderController.setResponsibleOfOrder(+req.params.orderId, +userId);
            res.status(201).json(order);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});
/**
 * @api {post} /orders/ Request for create order
 * @apiName create order
 * @apiGroup Orders
 * @apiParamExample {json}
 * {
 * "menuIds":[
 *    {
 *       "menuId":1,
 *       "xl":false,
 *       "productLine":[
 *          {
 *             "productLineId":1,
 *             "ingredienttoremove":[
 *                3
 *             ]
 *          }
 *       ]
 *    },
 *    {
 *       "menuId":1,
 *       "xl":true
 *    }
 * ],
 * "productLineIds":[
 *
 * @apiSuccess {Ingredient} return ingredient
 */
router.post('/', [bodyParser.json()], async (req: Request, res: Response) => {
    const {orderCustomerId, menuIds, productLineIds} = req.body;
    try {
        const order = await OrderController.createOrder(+orderCustomerId, menuIds, productLineIds);
        res.status(201).json(order);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * @api {get} /orders/ Request for get orders
 * @apiName get orders
 * @apiGroup Ordres
 * @apiHeader {String} token
 * @apiPermission role any
 *
 * @apiSuccess {Recipes} return list of orders of user logged
 * @apiError  {string} unauthorize
 */
router.get('/', [bodyParser.json(), AdminMiddleware.isLogged()], async (req: Request, res: Response) => {
    const token = tokentSpit(req.headers.authorization);
    try {
        const orders = await OrderController.getCustomerOrders(token);
        res.status(201).json(orders);
    } catch (e) {
        res.status(400).json(e);
    }
});

export default router;
