import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Ingredient} from "../entities/Ingredient";
import {IngredientController} from "../controllers/IngredientController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";

const router = Router();

/**
 * @api {get} /ingredients/ Request for get ingredients
 * @apiName get ingredients
 * @apiGroup Ingredients
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiSuccess {Ingredients} return list of Ingredients
 * @apiError  {string} unauthorize
 */
router.get('/', AdminMiddleware.isAdmin(), async (req: Request, res: Response) => {
    try {
        const ingredients: Ingredient[] = await IngredientController.getAllIngredients();
        res.status(200).json(ingredients);
    } catch (e) {
        res.status(400).json(e);
    }
});

/**
 * @api {post} /ingredients/ Request for create ingerdient
 * @apiName create ingredient
 * @apiGroup Ingredients
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {string} name of ingredients
 *
 * @apiSuccess {Ingredient} return ingredient
 * @apiError  {string} unauthorize
 */
router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.name);
    try {
        const ingredients = await IngredientController.createIngredient(req.body.name);
        res.status(201).json(ingredients);
    } catch (e) {
        res.status(400).json(e);
    }


});

/**
 * @api {put} /ingredients/:id  Request for update ingredients
 * @apiName update ingredients
 * @apiGroup Ingredients
 * @apiHeader {String} token admin
 * @apiPermission role admin
 *
 * @apiParam {string} name of ingredients
 *
 * @apiSuccess {Ingredient} return ingredient
 * @apiError  {string} unauthorize
 */
router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.name);
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Ingredient");
    try {
        const ingredients = await IngredientController.updateIngredient(+req.params.id, req.body.name);
        res.status(200).json(ingredients);
    } catch (e) {
        res.status(400).json(e);
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
router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Ingredient");
    try {
        const ingredients = await IngredientController.deleteIngredient(+req.params.id);
        res.status(ingredients.Code).json(ingredients.Message);
    } catch (e) {
        res.status(400).json(e);
    }
});

export default router;
