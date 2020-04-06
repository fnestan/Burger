import {Unit} from "../entities/Unit";
import {getRepository} from "typeorm";
import {IError} from "../interfaces/IError";
import {ISuccess} from "../interfaces/ISuccess";
import {Ingredient} from "../entities/Ingredient";

export class UnitController {

    static async getAllUnits() : Promise<Unit[]>{
        return await getRepository(Unit).find();
    }

    static async createUnit(name: string): Promise<Unit | IError> {
        try {
            const unit: Unit = await getRepository(Unit).create({
                name: name
            });

            return await getRepository(Unit).save(unit);
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async updateUnit(id: number, name: string): Promise<Unit | IError> {
        try {
            const unit = {
                id: id,
                name: name
            };
            const resUnit = await getRepository(Unit).preload(unit);
            return await getRepository(Unit).save(resUnit);
        } catch (e) {
            return {
                Code: 400,
                Message: e.toString()
            }
        }
    }

    static async deleteUnit(id: number): Promise<ISuccess | IError> {
        try {
            const unit = await getRepository(Unit).delete(id);
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
