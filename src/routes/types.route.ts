import {Request, Response, Router} from "express";
import {RefTypeProduct} from "../entities/RefTypeProduct";
import {TypesController} from "../controllers/TypesController";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {tokentSpit, userFromToken} from "../helpers/queryHelpers/userQueryHelper";
import {RoleTypes} from "../enums/RoleTypes";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {IMessageResponse} from "../interfaces/IMessageResponse";

const router = Router();
/**
 * @api {get} /types/ Request for get product types
 * @apiName get types
 * @apiGroup ProductTypes
 *
 * @apiSuccess {ProductTypes} return list of ProductTypes
 */
router.get('/', async (req: Request, res: Response) => {
    let isAdmin = false;
    if (req.headers["authorization"]) {
        const token = tokentSpit(req.headers["authorization"]);
        const userFound = await userFromToken(token);
        if (userFound && userFound.role.id === RoleTypes.Admin) {
            isAdmin = true;
        }
    }
    try {
        const refTypes: RefTypeProduct[] = await TypesController.getAllRefTypeProduct(isAdmin);
        res.status(200).json(refTypes);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * @api {post} /types/ Request for create ProductType
 * @apiName create ProductType
 * @apiGroup ProductTypes
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {string} label of ProductType
 *
 * @apiSuccess {ProductType} return ProductType
 * @apiError  {string} unauthorize
 */
router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.label);
    try {
        const refTypes = await TypesController.createRefTypeProduct(req.body.label);
        res.status(201).json(refTypes);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * @api {put} /types/:id  Request for update ProductTypes
 * @apiName update ProductType
 * @apiGroup ProductTypes
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {number} label of ProductType
 *
 * @apiSuccess {ProductType} return ProductType
 * @apiError  {string} unauthorize
 */
router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.label);
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "RefTypeProduct");
    try {
        const refTypes = await TypesController.updateRefTypeProduct(+req.params.id, req.body.label);
        res.status(200).json(refTypes);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * @api {delete} /types/:id  Request for delete ProductType
 * @apiName delete ProductTyp
 * @apiGroup ProductType
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {string} return success
 * @apiError {String} unautorised
 */
router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "RefTypeProduct");
    const refTypes: IMessageResponse = await TypesController.deleteRefTypeProduct(+req.params.id);
    res.status(refTypes.Code).json(refTypes.Message)
    try {
        const refTypes = await TypesController.createRefTypeProduct(req.body.label);
        res.status(201).json(refTypes);
    } catch (e) {
        res.status(400).json(e);
    }
});

export default router;
