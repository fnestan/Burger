import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {RoleTypes} from "../enums/RoleTypes";
import {Menu} from "../entities/Menu";
import {MenuController} from "../controllers/MenuController";
import {tokentSpit, userFromToken} from "../helpers/queryHelpers/userQueryHelper";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {ProductLine} from "../entities/ProductLine";
import {IMessageResponse} from "../interfaces/IMessageResponse";

const router = Router();
/**
 * @api {get} /menus/ Request for get menus
 * @apiName get menus
 * @apiGroup Menus
 *
 * @apiSuccess {Menus} return list of Menus
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
        const menus: Menu[] = await MenuController.getAllMenu(isAdmin);
        res.status(200).json(menus);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * @apiName {get} /menus/:id request for one menu
 * @apiGroup Menus
 *
 * @apiSuccess {Menus} return Menu by id param
 * */
router.get('/:id', async (req: Request, res: Response) => {
    let isAdmin = false;
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Menu");
    if (req.headers["authorization"]) {
        const token = tokentSpit(req.headers["authorization"]);
        const userFound = await userFromToken(token);
        if (userFound && userFound.role.id === RoleTypes.Admin) {
            isAdmin = true;
        }
    }
    if (elementDoesNotExist) {
        try {
            const menu: Menu = await MenuController.getMenuById(isAdmin, +req.params.id);
            res.status(200).json(menu);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});

/**
 * @api {post} /Menus/ Request for create menu
 * @apiName create menu
 * @apiGroup Menus
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {string} name of menu
 * @apiParam {float} price of menu
 * @apiParam {float} price of menu xl
 * @apiParam {boolean} orderable menu
 *
 * @apiSuccess {Menu} return menu
 * @apiError  {string} unauthorize
 */
router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {name, price, orderable, priceXl} = req.body;
    const productLineIds: number[] = req.body.productLineIds;
    const allRequiredParam = await VerificationHelper.allRequiredParam(name, price, orderable, productLineIds, priceXl, res);
    for (let i = 0; i < productLineIds.length; i++) {
        const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(productLineIds[i], res, "ProductLine");
        if (!elementDoesNotExist) {
            return;
        }
    }
    if (allRequiredParam) {
        try {
            const menus = await MenuController.createMenu(name, price, orderable, productLineIds, priceXl);
            res.status(201).json(menus);
        } catch (e) {
            res.status(400).json(e);
        }
    }

});

/**
 * @api {put} /menus/:id  Request for update menus
 * @apiName update menu
 * @apiGroup Menus
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {string} name of menu
 * @apiParam {float} price of menu
 * @apiParam {float} price of menu xl
 * @apiParam {boolean} orderable menu
 *
 * @apiSuccess {Ingredient} return ingredient
 * @apiError  {string} unauthorize
 */
router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {name, price, orderable, priceXl} = req.body;
    const productLineIds: number[] = req.body.productLineIds;
    const allRequiredParam = await VerificationHelper.allRequiredParam(name, price, orderable, productLineIds, priceXl, res);
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Menu");
    for (let i = 0; i < productLineIds.length; i++) {
        const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(productLineIds[i], res, "ProductLine");
        if (!elementDoesNotExist) {
            return;
        }
    }
    if (allRequiredParam && elementDoesNotExist) {
        try {
            const menus = await MenuController.updateMenu(+req.params.id, name, price, orderable, productLineIds, priceXl);
            res.status(200).json(menus);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});

/**
 * @api {delete} /menus/:id  Request for delete menus
 * @apiName delete menus
 * @apiGroup Menus
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {string} return success
 */
router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const elementDoesNotExistMenu = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Menu");
    if (elementDoesNotExistMenu) {
        try {
            const menu: IMessageResponse = await MenuController.deleteMenu(+req.params.id);
            res.status(menu.Code).json(menu.Message);
        } catch (e) {
            res.status(400).json(e);
        }
    }

});

/**
 * @api {delete} /ingredients/:id  Request for delete ingredients
 * @apiName delete ingredients
 * @apiGroup Ingredients
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {string} return success
 */
router.delete('/:menuId/:productLineId', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const elementDoesNotExistMenu = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Menu");
    const elementDoesNotExistProductLine = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "ProductLine");
    if (elementDoesNotExistMenu && elementDoesNotExistProductLine) {
        try {
            const menu = await MenuController.deleteProductLineMenu(+req.params.menuId, +req.params.productLineId);
            res.status(200).json(menu);
        } catch (e) {
            res.status(400).json(e);
        }
    }

});

export default router;
