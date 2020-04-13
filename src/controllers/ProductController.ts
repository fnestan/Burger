import {RefTypeProduct} from "../entities/RefTypeProduct";
import {getRepository} from "typeorm";
import {Product} from "../entities/Product";
import {IMessageResponse} from "../interfaces/IMessageResponse";


export class ProductController {


    static async createProduct(name: string, typeId: number): Promise<Product> {
        const type: RefTypeProduct = await getRepository(RefTypeProduct).findOne(typeId);
        const product: Product = await getRepository(Product).create({
            name: name,
            type: type
        });
        return await getRepository(Product).save(product);
    }

    static async updateProduct(id: number, name: string, typeId: number): Promise<Product> {
        const type: RefTypeProduct = await getRepository(RefTypeProduct).findOne(typeId);
        const product = {
            id: id,
            name: name,
            type: type
        };
        const resProduct = await getRepository(Product).preload(product)
        return await getRepository(Product).save(resProduct);
    }

    static async deleteProduct(id: number): Promise<IMessageResponse> {
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
