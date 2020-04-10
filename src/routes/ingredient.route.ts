import {Request, Response, Router} from "express";
import bodyParser from "body-parser";
import {AdminMiddleware} from "../middlewares/AdminMiddleware";
import {Ingredient} from "../entities/Ingredient";
import {IngredientController} from "../controllers/IngredientController";
import {VerificationHelper} from "../helpers/verficationHelper/verificationHelper";

const router = Router();

router.get('/', AdminMiddleware.isAdmin(), async (req: Request, res: Response) => {
    const ingredients: Ingredient[] = await IngredientController.getAllIngredients();
    res.status(200).json(ingredients);
});

router.post('/', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.name);
    const ingredients = await IngredientController.createIngredient(req.body.name);
    res.status(201).json(ingredients)


});

router.put('/:id', [bodyParser.json(), AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    VerificationHelper.allRequiredParam(req.body.name);
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Ingredient");
    const ingredients = await IngredientController.updateIngredient(+req.params.id, req.body.name);
    res.status(200).json(ingredients);
});

router.delete('/:id', [AdminMiddleware.isAdmin()], async (req: Request, res: Response) => {
    await VerificationHelper.elementDoesNotExist(+req.params.id, res, "Ingredient");
    const ingredients = await IngredientController.deleteIngredient(+req.params.id);
    res.status(ingredients.Code).json(ingredients.Message);
});

export default router;
