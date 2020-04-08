import {Request, Response, Router} from "express";
import {RefTypeProduct} from "../entities/RefTypeProduct";
import {TypesController} from "../controllers/TypesController";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {RoleTypes} from "../enums/RoleTypes";
import {Menu} from "../entities/Menu";
import {MenuController} from "../controllers/MenuController";
import {userFromToken} from "../helpers/queryHelpers/userQueryHelper";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    let isAdmin = false;
    if (req.headers["authorization"]) {
        const token = req.headers["authorization"].split(" ")[1];
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
    if (req.headers["authorization"]) {
        const token = req.headers["authorization"].split(" ")[1];
        const userFound = await userFromToken(token);
        if (userFound && userFound.role.id === RoleTypes.Admin) {
            isAdmin = true;
        }
    }
    const menu: Menu = await MenuController.getMenuById(isAdmin, +req.params.id);
    res.status(200).json(menu);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const menus = await MenuController.createMenu(req.body.name, req.body.price, req.body.orderable, req.body.productLineIds);
    if ((menus as IError).Code) {
        res.status((menus as IError).Code).json((menus as IError).Message);
    } else {
        res.status(201).json(menus)
    }

});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const menus = await MenuController.updateMenu(+req.params.id, req.body.name, req.body.price, req.body.orderable, req.body.productLineIds);
    if ((menus as IError).Code) {
        res.status((menus as IError).Code).json((menus as IError).Message);
    } else {
        res.status(200).json(menus)
    }
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const menu: IError | ISuccess = await MenuController.deleteMenu(+req.params.id);
    res.status(menu.Code).json(menu.Message);
});

router.delete('/:menuId/:productLineId', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const menu = await MenuController.deleteProductLineMenu(+req.params.menuId, +req.params.productLineId);
    res.status(200).json(menu);
});

export default router;
