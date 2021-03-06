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
    const allRequiredParam = VerificationHelper.allRequiredParam(req.body.name);
    if (allRequiredParam) {
        try {
            const ingredients = await IngredientController.createIngredient(req.body.name);
            res.status(201).json(ingredients);
        } catch (e) {
            res.status(400).json(e);
        }
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
    const allRequiredParam = VerificationHelper.allRequiredParam(req.body.name);
    const elementDoesNotExist = await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Ingredient");
    if (allRequiredParam && elementDoesNotExist) {
        try {
            const ingredients = await IngredientController.updateIngredient(+req.params.id, req.body.name);
            res.status(200).json(ingredients);
        } catch (e) {
            res.status(400).json(e);
        }
    }
});


export default router;
