import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Ingredient} from "../entities/Ingredient";
import {IngredientController} from "../controllers/IngredientController";

const router = Router();

router.get('/', AdminMiddleware.isAdmin(), async (req: Request, res: Response) => {
    const ingredients: Ingredient[] = await IngredientController.getAllIngredients();
    res.status(200).json(ingredients);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const ingredients = await IngredientController.createIngredient(req.body.name);
    if ((ingredients as IError).Code) {
        res.status((ingredients as IError).Code).json((ingredients as IError).Message);
    } else {
        res.status(201).json(ingredients)
    }

});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const ingredients = await IngredientController.updateIngredient(+req.params.id, req.body.name);
    if ((ingredients as IError).Code) {
        res.status((ingredients as IError).Code).json((ingredients as IError).Message);
    } else {
        res.status(200).json(ingredients);
    }
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const ingredients: IError | ISuccess = await IngredientController.deleteIngredient(+req.params.id);
    res.status(ingredients.Code).json(ingredients.Message);
});

export default router;
