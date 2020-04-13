import {userFromEmail} from "../queryHelpers/userQueryHelper";
import {IMessageResponse} from "../../interfaces/IMessageResponse";
import {Response} from "express";
import {RoleTypes} from "../../enums/RoleTypes";
import {User} from "../../entities/User";
import {discoutFromMenuId, discoutFromProductLineId} from "../queryHelpers/discountQueryHelper";
import {entityFromId} from "../queryHelpers/QueryHelpersById";
import {forwardFromMenuId, forwardFromProductLineId} from "../queryHelpers/forwardQueryHelpers";
import {getRepository} from "typeorm";
import {ProductLine} from "../../entities/ProductLine";
import {Recipe} from "../../entities/Recipe";
import {Ingredient} from "../../entities/Ingredient";
import {Product} from "../../entities/Product";

export class VerificationHelper {
    static async emailAlreadyExiest(email: string, res: Response) {
        try {
            const user = await userFromEmail(email);
            if (user) {
                let response: IMessageResponse = {
                    Code: 400,
                    Message: "Cet email existe déjà"
                };
                res.status(response.Code).json(response.Message);
                return;
            }
        } catch (e) {
            console.log(e)
        }
    }

    static passwordCormimationGood(password: string, passwordConfirm: string, res: Response) {
        if (password !== passwordConfirm) {
            let response: IMessageResponse = {
                Code: 400,
                Message: "le mot de passe de doit être similaire à celui de la confirmation"
            };
            res.status(response.Code).json(response.Message);
            return;
        }
    }

    static cannotCreteUser(user: User, res: Response) {
        if (user.role.id === RoleTypes.Customer || user.role.id === RoleTypes.OrderPicker) {
            let response: IMessageResponse = {
                Code: 403,
                Message: "Vous ne pouvez pas créer de nouvel utilisateur"
            };
            res.status(response.Code).json(response.Message);
            return;
        }
    }

    static allRequiredParam(...args: any) {
        for (let i: number = 0; i < args.length - 1; i++) {
            if (!args[i] && typeof args[i] !== "boolean") {
                let response: IMessageResponse = {
                    Code: 400,
                    Message: "Certains Champ sont obligatoires"
                };
                const res: Response = args[args.length - 1];
                res.status(response.Code).json(response.Message);
                return;
            }
        }
    }

    static async discountExistOnMenu(menuId: number, res: Response) {
        try {
            const discount = await discoutFromMenuId(menuId);
            if (discount) {
                let response: IMessageResponse = {
                    Code: 400,
                    Message: "une promo existe déjà sur ce menu"
                };
                res.status(response.Code).json(response.Message);
                return;
            }
        } catch (e) {
            console.log(e);
        }
    }

    static async discountExistOnProductLine(productLineId: number, res: Response) {
        try {
            const discount = await discoutFromProductLineId(productLineId);
            if (discount) {
                let response: IMessageResponse = {
                    Code: 400,
                    Message: "une promo existe déjà sur cette ligne de produit"
                };
                res.status(response.Code).json(response.Message);
                return;
            }
        } catch (e) {
            console.log(e);
        }
    }


    static async elementDoesNotExist(idElement: number, res: Response, typelelment: string) {
        try {
            const element = await entityFromId(idElement, typelelment);
            if (!element) {
                let response: IMessageResponse = {
                    Code: 400,
                    Message: "Ce(Cette) " + typelelment + " n'existe pas"
                };
                res.status(response.Code).json(response.Message);
                return;
            }
        } catch (e) {
            e;
        }
    }

    static async forwardExistOnMenu(menuId: number, res: Response) {
        try {
            const discount = await forwardFromMenuId(menuId);
            if (discount) {
                let response: IMessageResponse = {
                    Code: 400,
                    Message: "une  mise en avant existe déjà sur ce menu"
                };
                res.status(response.Code).json(response.Message);
                return;
            }
        } catch (e) {
            console.log(e);
        }
    }

    static async forwardExistOnProductLine(productLineId: number, res: Response) {
        try {
            const discount = await forwardFromProductLineId(productLineId);
            if (discount) {
                let response: IMessageResponse = {
                    Code: 400,
                    Message: "une mise en avant existe déjà sur cette ligne de produit"
                };
                res.status(response.Code).json(response.Message);
                return;
            }
        } catch (e) {
            console.log(e);
        }
    }

    //static async stringforRemoveIngredient(pl:ProductLine,idIngredientToRemove[]): Promise<string>
    static async stringforRemoveIngredient(productLine: [{ productLineId: number, ingredienttoremove: [] }]): Promise<string> {
        let response: string = "";
        let res: Response;
        for (let i = 0; i < productLine.length; i++) {
            await this.elementDoesNotExist(productLine[i].productLineId, res, "ProductLine");
            const Pl = await getRepository(ProductLine).findOne({
                where: {
                    id: productLine[i].productLineId
                }
            });
            for (let j = 0; j < productLine[i].ingredienttoremove.length; j++) {
                await this.elementDoesNotExist(productLine[i].ingredienttoremove[j], res, "Ingredient");
                const ingredient = await getRepository(Ingredient).findOne(productLine[i].ingredienttoremove[j]);
                const recipe = await getRepository(Recipe).findOne({
                    where: {
                        ingredient: ingredient,
                        productLine: Pl
                    }
                });
                if (recipe && recipe.removable) {
                    response = response.concat(" sans ", ingredient.name);
                }
            }
        }
        return response;
    }

    static async test(pl: ProductLine, idIngredientToRemove: number[]): Promise<string> {
        let response: string = "";
        let res: Response;
        for (let j = 0; j < idIngredientToRemove.length; j++) {
            await this.elementDoesNotExist(idIngredientToRemove[j], res, "Ingredient");
            const ingredient = await getRepository(Ingredient).findOne(idIngredientToRemove[j]);
            const recipe = await getRepository(Recipe).findOne({
                where: {
                    ingredient: ingredient,
                    productLine: pl
                }
            });
            if (recipe && recipe.removable) {
                response = response.concat(" sans ", ingredient.name);
            }
        }

        return response;
    }
}

