import {getRepository} from "typeorm";
import {Ingredient} from "../entities/Ingredient";
import {IMessageResponse} from "../interfaces/IMessageResponse";

export class IngredientController {

    static async getAllIngredients(): Promise<Ingredient[]> {
        return await getRepository(Ingredient).find();
    }

    static async createIngredient(name: string): Promise<Ingredient> {
        const ingredient: Ingredient = await getRepository(Ingredient).create({
            name: name
        });
        return await getRepository(Ingredient).save(ingredient);
    }

    static async updateIngredient(id: number, name: string): Promise<Ingredient> {
        const ingredient = {
            id: id,
            name: name
        }
        const resIngredient = await getRepository(Ingredient).preload(ingredient);
        return await getRepository(Ingredient).save(resIngredient);
    }

    static async deleteIngredient(id: number): Promise<IMessageResponse> {
        const ingredient = await getRepository(Ingredient).delete(id);
        return {
            Code: 201,
            Message: "Successful"
        }
    }
}
