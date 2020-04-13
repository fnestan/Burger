import {Unit} from "../entities/Unit";
import {getRepository} from "typeorm";
import {IMessageResponse} from "../interfaces/IMessageResponse";

export class UnitController {

    static async getAllUnits(): Promise<Unit[]> {
        return await getRepository(Unit).find();
    }

    static async createUnit(name: string): Promise<Unit> {
        const unit: Unit = await getRepository(Unit).create({
            name: name
        });
        return await getRepository(Unit).save(unit);
    }

    static async updateUnit(id: number, name: string): Promise<Unit> {
        const unit = {
            id: id,
            name: name
        };
        const resUnit = await getRepository(Unit).preload(unit);
        return await getRepository(Unit).save(resUnit);

    }

    static async deleteUnit(id: number): Promise<IMessageResponse> {
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
