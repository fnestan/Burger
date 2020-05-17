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
router.get('/take/:orderId',  AdminMiddleware.canTakeChargeOfOrder(), async (req: Request, res: Response) => {
    const authorization = req.headers['authorization'].split(" ")[1];
    const elementDoesNotExistOrder = await VerificationHelper.elementDoesNotExist(+req.params.orderId, res, "Order");
    if (elementDoesNotExistOrder) {
        try {
            const order = await OrderController.setResponsibleOfOrder(+req.params.orderId, authorization);
            res.status(200).json(order);
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
router.post('/create', [bodyParser.json()], async (req: Request, res: Response) => {
    const {orderCustomerId, menuIds, productLineIds} = req.body;
 try {
        const order = await OrderController.createOrder(+orderCustomerId, menuIds, productLineIds);
        res.status(201).json(order);
    } catch (e) {
        console.log(e)
        res.status(400).json(e);
    }
});

router.get('/ready/:id', AdminMiddleware.canTakeChargeOfOrder(), async (req: Request, res: Response) => {
    const Exist = await VerificationHelper.elementDoesNotExist(+req.params.id, res, 'Order');
    if (Exist) {
        const authorization = req.headers['authorization'].split(" ")[1];
        try {
            const order = await OrderController.orderIsReady(authorization, +req.params.id);
            res.status(200).json(order);
        } catch (e) {
            console.log(e);
            res.status(400).json(e);
        }
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
        res.status(200).json(orders);
    } catch (e) {
        res.status(400).json(e);
    }
});

// mes commande a traitee
router.get('/myOrders', AdminMiddleware.canTakeChargeOfOrder(), async (req: Request, res: Response) => {
    const token = tokentSpit(req.headers.authorization);
    console.log('myOrders')
    try {
        const orders = await OrderController.getMyOrderToTreated(token);
        res.status(200).json(orders);
    } catch (e) {
        console.log(e)
        res.status(400).json(e);
    }
});

// les commande non prise en charge
router.get('/nonTreated', AdminMiddleware.canTakeChargeOfOrder(), async (req: Request, res: Response) => {
    const token = tokentSpit(req.headers.authorization);
    try {
        const orders = await OrderController.getNonChargerOrders();
        res.status(200).json(orders);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.get('/nonPaid', [bodyParser.json(), AdminMiddleware.canTakeChargeOfOrder()], async (req: Request, res: Response) => {
    try {
        const orders = await OrderController.getNonPaidOrders();
        res.status(200).json(orders);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});


router.get('/readyOrders', [bodyParser.json(), AdminMiddleware.canTakeChargeOfOrder()], async (req: Request, res: Response) => {
    const token = tokentSpit(req.headers.authorization);
    try {
        const orders = await OrderController.getReadyOrders();
        res.status(200).json(orders);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.get('/picked/:id', AdminMiddleware.canTakeChargeOfOrder(), async (req: Request, res: Response) => {
    if (await VerificationHelper.elementDoesNotExist(+req.params.id, res, 'Order')) {
        try {
            const order = await OrderController.orderIsPick(+req.params.id);
            res.status(200).json(order);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});

router.get('/paidOrder/:id', AdminMiddleware.canTakeChargeOfOrder(), async (req: Request, res: Response) => {
    if (await VerificationHelper.elementDoesNotExist(+req.params.id, res, 'Order')) {
        try {
            const order = await OrderController.orderIsPaid(+req.params.id);
            res.status(200).json(order);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});

export default router;
