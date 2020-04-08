import {getRepository} from "typeorm";
import {Ingredient} from "../entities/Ingredient";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {Recipe} from "../entities/Recipe";
import {ProductLine} from "../entities/ProductLine";
import {Unit} from "../entities/Unit";
import {IMessageResponse} from "../interfaces/IMessageResponse";

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

    static async getRecipe(productId: number): Promise<Recipe[]> {
        const productLine = await getRepository(ProductLine).findOne(productId);
        return await getRepository(Recipe).find({
            where: {
                productLine: productLine
            }
        });

    }

    static async createRecipeLine(quantity: number, removable: boolean, unitId: number, productLineId: number, ingredientId: number): Promise<Recipe> {
        const canCreate = await RecipeController.canSaveRecipe(unitId, productLineId, ingredientId) as { unit: Unit, productLine: ProductLine, ingredient: Ingredient };
        const recipe: Recipe = await getRepository(Recipe).create({
            quantity: quantity,
            removable: removable,
            unit: canCreate.unit,
            productLine: canCreate.productLine,
            ingredient: canCreate.ingredient
        });
        return await getRepository(Recipe).save(recipe);
    }

    static async updateRecipeLine(id: number, quantity: number, removable: boolean, unitId: number, productLineId: number, ingredientId: number): Promise<Recipe> {
        const canUpdate = await RecipeController.canSaveRecipe(unitId, productLineId, ingredientId) as { unit: Unit, productLine: ProductLine, ingredient: Ingredient };
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
    }

    static async deleteRecipeLine(id: number): Promise<IMessageResponse> {
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
