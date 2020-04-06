import {RefTypeProduct} from "../entities/RefTypeProduct";
import {Equal, getRepository, In} from "typeorm";
import {ISuccess} from "../interfaces/ISuccess";
import {IError} from "../interfaces/IError";
import {Product} from "../entities/Product";
import {ProductLine} from "../entities/ProductLine";


export class ProductController {


    static async createProduct(name: string, typeId: number): Promise<Product | IError> {
        const type: RefTypeProduct = await getRepository(RefTypeProduct).findOne(typeId);
        if (!type) {
            return {
                Code: 400,
                Message: "Le type n'existe pas"
            }
        }
        try {
            const product: Product = await getRepository(Product).create({
                name: name,
                type: type
            });

            return await getRepository(Product).save(product);

        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async updateProduct(id: number, name: string, typeId: number): Promise<Product | IError> {
        const type: RefTypeProduct = await getRepository(RefTypeProduct).findOne(typeId);
        if (!type) {
            return {
                Code: 400,
                Message: "Le type n'existe pas"
            }
        }
        try {
            const product = {
                id: id,
                name: name,
                type: type
            };
            const resProduct = await getRepository(Product).preload(product)
            return await getRepository(Product).save(resProduct);
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async deleteProduct(id: number): Promise<ISuccess | IError> {
        try {
            const product = await getRepository(Product).delete(id);
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
