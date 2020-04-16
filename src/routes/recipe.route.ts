import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Recipe} from "../entities/Recipe";
import {RecipeController} from "../controllers/RecipeController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";

const router = Router();

/**
 * @api {get} /recipes/:productlineId Request for get recipes by productline id
 * @apiName get recipes
 * @apiGroup Recipes
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {Recipes} return list of Recipes
 * @apiError  {string} unauthorize
 */
router.get('/:productlineId', AdminMiddleware.canTakeChargeOfOrder(), async (req: Request, res: Response) => {
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.productlineId, res, "ProductLine");
    if (elementDoesNotExist) {
        try {
            const recipes: Recipe[] = await RecipeController.getRecipe(+req.params.productlineId);
            res.status(200).json(recipes);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});

/**
 * @api {post} /ingredients/ Request for create line  recipe
 * @apiName create recipe line
 * @apiGroup Recipes
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {number} quantity of recipe
 * @apiParam {boolean} removable of recipe
 * @apiParam {unitId}  id of Unit
 * @apiParam {number} id of productLine
 * @apiParam {number} id of ingredient
 *
 * @apiSuccess {Recipe} return Recipe
 * @apiError  {string} unauthorize
 */
router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {quantity, removable, unitId, productLineId, ingredientId} = req.body;
    const elementDoesNotExistOnProductLine = await VerificationHelper.elementDoesNotExist(+productLineId, res, "ProductLine");
    const elementDoesNotExistUnit = await VerificationHelper.elementDoesNotExist(+unitId, res, "Unit");
    const elementDoesNotExistIngredient = await VerificationHelper.elementDoesNotExist(+ingredientId, res, "Ingredient");
    const allRequireParams = VerificationHelper.allRequiredParam(quantity, removable, unitId, productLineId, ingredientId, res);
    if (elementDoesNotExistOnProductLine && elementDoesNotExistIngredient && elementDoesNotExistUnit && allRequireParams) {
        try {
            const Recipe = await RecipeController.createRecipeLine(+quantity, removable, +unitId, +productLineId, +ingredientId);
            res.status(201).json(Recipe);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});

/**
 * @api {put} /recipes/:id  Request for update recipe
 * @apiName update recipe
 * @apiGroup Recipes
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {number} quantity of recipe
 * @apiParam {boolean} removable of recipe
 *
 * @apiSuccess {Recipe} return Recipe
 * @apiError  {string} unauthorize
 */
router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const {quantity, removable} = req.body;
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Recipe");
    const allRequireParams = VerificationHelper.allRequiredParam(quantity, removable, res);
    if (allRequireParams && elementDoesNotExist) {
        try {
            const recipe = await RecipeController.updateRecipeLine(+req.params.id, quantity, removable);
            res.status(200).json(recipe);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});

/**
 * @api {delete} /recipes/:id  Request for delete recipe
 * @apiName delete recipe
 * @apiGroup Recipes
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {string} return success
 */
router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Recipe");
    if (elementDoesNotExist) {
        try {
            const recipe: IError | ISuccess = await RecipeController.deleteRecipeLine(+req.params.id);
            res.status(recipe.Code).json(recipe.Message);
        } catch (e) {
            res.status(400).json(e);
        }
    }

});

export default router;
