import {Product} from "../entities/Product";
import {getRepository} from "typeorm";
import {ProductLine} from "../entities/ProductLine";
import {IError} from "../interfaces/IError";
import {RefTypeProduct} from "../entities/RefTypeProduct";
import {ISuccess} from "../interfaces/ISuccess";

export class ProductLineController {


    static async createProductLine(desc_size: string, price: number, orderable: boolean, productId: number): Promise<ProductLine | IError> {
        const product: Product = await getRepository(Product).findOne(productId);
        if (!product) {
            return {
                Code: 400,
                Message: "Le produit n'existe pas"
            }
        }
        try {
            const productLine: ProductLine = await getRepository(ProductLine).create({
                desc_size: desc_size,
                price: price,
                orderable: orderable,
                product: product
            });
            return await getRepository(ProductLine).save(productLine);
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async updateProductLine(id: number, desc_size: string, price: number, orderable: boolean, productId: number): Promise<ProductLine | IError> {
        const product: Product = await getRepository(Product).findOne(productId);
        if (!product) {
            return {
                Code: 400,
                Message: "Le produit n'existe pas"
            }
        }
        try {
            const productLine = {
                id: id,
                desc_size: desc_size,
                price: price,
                orderable: orderable,
                product: product
            };
            const resProductLine = await getRepository(ProductLine).preload(productLine)
            return await getRepository(ProductLine).save(resProductLine);
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async deleteProductLine(id: number): Promise<ISuccess | IError> {
        try {
            const productLine = await getRepository(ProductLine).delete(id);
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
