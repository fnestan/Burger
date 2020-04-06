import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Recipe} from "../entities/Recipe";
import {RecipeController} from "../controllers/RecipeController";

const router = Router();

router.get('/', AdminMiddleware.isOrderPicker(), async (req: Request, res: Response) => {

    const recipes: IError | Recipe[] = await RecipeController.getRecipe(+req.params.productlineId);
    res.status(200).json(recipes);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const Recipe = await RecipeController.createRecipeLine(req.body.quantity, req.body.removable, req.body.unitId, req.body.productLineId, req.body.ingredientId);
    if ((Recipe as IError).Code) {
        res.status((Recipe as IError).Code).json((Recipe as IError).Message);
    } else {
        res.status(201).json(Recipe)
    }

});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const recipe = await RecipeController.updateRecipeLine(+req.params.id, req.body.quantity, req.body.removable, req.body.unitId, req.body.productLineId, req.body.ingredientId);
    if ((recipe as IError).Code) {
        res.status((recipe as IError).Code).json((recipe as IError).Message);
    } else {
        res.status(200).json(recipe);
    }
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const recipe: IError | ISuccess = await RecipeController.deleteRecipeLine(+req.params.id);
    res.status(recipe.Code).json(recipe.Message);
});

export default router;
