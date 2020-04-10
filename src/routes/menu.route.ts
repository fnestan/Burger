import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {RoleTypes} from "../enums/RoleTypes";
import {Menu} from "../entities/Menu";
import {MenuController} from "../controllers/MenuController";
import {tokentSpit, userFromToken} from "../helpers/queryHelpers/userQueryHelper";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";
import {ProductLine} from "../entities/ProductLine";
import {IMessageResponse} from "../interfaces/IMessageResponse";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    let isAdmin = false;
    if (req.headers["authorization"]) {
        const token = tokentSpit(req.headers["authorization"]);
        const userFound = await userFromToken(token);
        if (userFound && userFound.role.id === RoleTypes.Admin) {
            isAdmin = true;
        }
    }
    const menus: Menu[] = await MenuController.getAllMenu(isAdmin);
    res.status(200).json(menus);
});

router.get('/:id', async (req: Request, res: Response) => {
    let isAdmin = false;
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Menu");
    if (req.headers["authorization"]) {
        const token = tokentSpit(req.headers["authorization"]);
        const userFound = await userFromToken(token);
        if (userFound && userFound.role.id === RoleTypes.Admin) {
            isAdmin = true;
        }
    }
    const menu: Menu = await MenuController.getMenuById(isAdmin, +req.params.id);
    res.status(200).json(menu);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {name, price, orderable, priceXl} = req.body;
    const productLineIds: number[] = req.body.productLineIds;
    await VerificationHelper.allRequiredParam(name, price, orderable, productLineIds, priceXl, res);
    for (let i = 0; i < productLineIds.length; i++) {
        await VerificationHelper.elementDoesNotExist(productLineIds[i], res, "ProductLine");
    }
    const menus = await MenuController.createMenu(name, price, orderable, productLineIds, priceXl);
    res.status(201).json(menus);
});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {name, price, orderable, priceXl} = req.body;
    const productLineIds: number[] = req.body.productLineIds;
    await VerificationHelper.allRequiredParam(name, price, orderable, productLineIds, priceXl, res);
    for (let i = 0; i < productLineIds.length; i++) {
        await VerificationHelper.elementDoesNotExist(productLineIds[i], res, "ProductLine");
    }
    const menus = await MenuController.updateMenu(+req.params.id, name, price, orderable, productLineIds, priceXl);
    res.status(200).json(menus);
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Menu");
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "ProductLine");
    const menu: IMessageResponse = await MenuController.deleteMenu(+req.params.id);
    res.status(menu.Code).json(menu.Message);
});

router.delete('/:menuId/:productLineId', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Menu");
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "ProductLine");
    const menu = await MenuController.deleteProductLineMenu(+req.params.menuId, +req.params.productLineId);
    res.status(200).json(menu);
});

export default router;
