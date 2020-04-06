import {getRepository} from "typeorm";
import {Ingredient} from "../entities/Ingredient";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {Recipe} from "../entities/Recipe";
import {ProductLine} from "../entities/ProductLine";
import {Unit} from "../entities/Unit";

export class RecipeController {
    private static async canSaveRecipe(unitId: number, productLineId: number, ingredientId: number): Promise<IError | { unit: Unit, productLine: ProductLine, ingredient: Ingredient }> {
        const productLine = await getRepository(ProductLine).findOne(productLineId);
        if (!productLine) {
            return {
                Code: 400,
                Message: "Cette ligne de produit n'existe pas"
            }
        }
        const ingredient = await getRepository(Ingredient).findOne(ingredientId);
        if (!ingredient) {
            return {
                Code: 400,
                Message: "Cet ingrédient n'existe pas"
            }
        }
        const unit = await getRepository(Unit).findOne(unitId);
        if (!unit) {
            return {
                Code: 400,
                Message: "Cette unité n'existe pas"
            }
        }
        return {
            unit: unit,
            productLine: productLine,
            ingredient: ingredient
        }
    }

    static async getRecipe(productId: number): Promise<Recipe[] | IError> {
        const productLine = await getRepository(ProductLine).findOne(productId);
        if (!productLine) {
            return {
                Code: 400,
                Message: "Cette ligne de produit n'existe pas"
            }
        }
        return await getRepository(Recipe).find({
            where: {
                productLine: productLine
            }
        });

    }

    static async createRecipeLine(quantity: number, removable: boolean, unitId: number, productLineId: number, ingredientId: number): Promise<Recipe | IError> {
        const canCreate = await RecipeController.canSaveRecipe(unitId, productLineId, ingredientId) as { unit: Unit, productLine: ProductLine, ingredient: Ingredient };
        try {
            const recipe: Recipe = await getRepository(Recipe).create({
                quantity: quantity,
                removable: removable,
                unit: canCreate.unit,
                productLine: canCreate.productLine,
                ingredient: canCreate.ingredient
            });

            return await getRepository(Recipe).save(recipe);
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async updateRecipeLine(id: number, quantity: number, removable: boolean, unitId: number, productLineId: number, ingredientId: number): Promise<Recipe | IError> {
        const canUpdate = await RecipeController.canSaveRecipe(unitId, productLineId, ingredientId) as { unit: Unit, productLine: ProductLine, ingredient: Ingredient };
        try {
            const recipe = {
                id: id,
                quantity: quantity,
                removable: removable,
                unit: canUpdate.unit,
                productLine: canUpdate.productLine,
                ingredient: canUpdate.ingredient
            };
            const resRecipe = await getRepository(Recipe).preload(recipe)
            return await getRepository(Recipe).save(resRecipe);
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async deleteRecipeLine(id: number): Promise<ISuccess | IError> {
        try {
            const recepeLine = await getRepository(Recipe).delete(id);
            return {
                Code: 201,
                Message: "Successful"
            }
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }
}
