import mongoose, { InferSchemaType } from "mongoose";
import { ICreditorService } from "../contracts/iCreditorService";
import { Creditor } from "../entitys/creditor";
import CreditorRepository from "../repository/creditorRepository";
import { CreditorSchema } from "../models/creditorSchema";

export class CreditorService implements ICreditorService{
    async getAll(): Promise<Creditor[]> {
        const creditorData = await CreditorRepository.getAll();
        const creditors = new Array<Creditor>();
        
        for(let i = 0 ; i < creditorData.length ; i++){
            creditors.push(this.mapRepositoryToModel(creditorData[i]));
        }
        
        return creditors;
    }

    async add(creditor: Creditor): Promise<void> {
        const creditorData = this.mapModelToRepository(creditor);
        await CreditorRepository.add(creditorData);
    }
    async activateOrInactivate(id: string,isActive:boolean): Promise<boolean> {
        try {
            await CreditorRepository.activateOrInactivate(id,isActive);
            return true;
        } catch (error) {
            console.error("Error inactivating creditor:", error);
            return false;
        }
    }

    private mapModelToRepository(creditor: Creditor): InferSchemaType<typeof CreditorSchema> {
        return {
            name: creditor.name,
            created_at: creditor.created_at,
            is_active: creditor.is_active
        };
    }

    private mapRepositoryToModel(creditor: InferSchemaType<typeof CreditorSchema>): Creditor {
        const creditorModel = new Creditor(creditor.name,creditor.is_active,creditor.created_at);
        return creditorModel;
    }
    
}
    