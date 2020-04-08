import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Recipe} from "../entities/Recipe";
import {RecipeController} from "../controllers/RecipeController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";

const router = Router();

router.get('/', AdminMiddleware.isOrderPicker(), async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.productlineId, res, "ProductLine");
    const recipes: Recipe[] = await RecipeController.getRecipe(+req.params.productlineId);
    res.status(200).json(recipes);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {quantity, removable, unitId, productLineId, ingredientId} = req.body;
    await VerificationHelper.elementDoesNotExist(+productLineId, res, "ProductLine");
    await VerificationHelper.elementDoesNotExist(+unitId, res, "Unit");
    await VerificationHelper.elementDoesNotExist(+ingredientId, res, "Ingredient");
    VerificationHelper.allRequiredParam(quantity, removable, unitId, productLineId, ingredientId, res);
    const Recipe = await RecipeController.createRecipeLine(quantity, removable, unitId, productLineId, ingredientId);
    res.status(201).json(Recipe);
});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {quantity, removable, unitId, productLineId, ingredientId} = req.body;
    await VerificationHelper.elementDoesNotExist(+productLineId, res, "ProductLine");
    await VerificationHelper.elementDoesNotExist(+unitId, res, "Unit");
    await VerificationHelper.elementDoesNotExist(+ingredientId, res, "Ingredient");
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Recipe");
    VerificationHelper.allRequiredParam(quantity, removable, unitId, productLineId, ingredientId, res);
    const recipe = await RecipeController.updateRecipeLine(+req.params.id, req.body.quantity, req.body.removable, req.body.unitId, req.body.productLineId, req.body.ingredientId);
    res.status(200).json(recipe);
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Recipe");
    const recipe: IError | ISuccess = await RecipeController.deleteRecipeLine(+req.params.id);
    res.status(recipe.Code).json(recipe.Message);
});

export default router;
