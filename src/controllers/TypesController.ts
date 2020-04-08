import {RefTypeProduct} from "../entities/RefTypeProduct";
import {getRepository} from "typeorm";
import {ISuccess} from "../interfaces/ISuccess";
import {IError} from "../interfaces/IError";

export class TypesController {
    static async getAllRefTypeProduct(isAdmin: boolean): Promise<RefTypeProduct[]> {
        if (isAdmin) {
            return await getRepository(RefTypeProduct).find();
        }
        const refTypeProducts = await getRepository(RefTypeProduct).find({
            relations: ["products"],
            where: {
                orderable: true
            }
        });
        return refTypeProducts
    }

    static async createRefTypeProduct(label: string): Promise<RefTypeProduct> {
        const ref: RefTypeProduct = await getRepository(RefTypeProduct).create({
            label: label
        });

        return await getRepository(RefTypeProduct).save(ref);
    }

    static async updateRefTypeProduct(id: number, label: string): Promise<RefTypeProduct | IError> {
        try {
            const ref = {
                id: id,
                label: label
            };
            const resRef = await getRepository(RefTypeProduct).preload(ref)
            return await getRepository(RefTypeProduct).save(resRef);
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async deleteRefTypeProduct(id: number): Promise<ISuccess | IError> {
        try {
            const ref = await getRepository(RefTypeProduct).delete(id);
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
