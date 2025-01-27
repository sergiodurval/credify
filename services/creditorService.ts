import { InferSchemaType } from "mongoose";
import { ICreditorService } from "../contracts/iCreditorService";
import { Creditor } from "../entitys/creditor";
import CreditorRepository from "../repository/creditorRepository";
import { CreditorSchema } from "../models/creditorSchema";

export class CreditorService implements ICreditorService{

    async add(creditor: Creditor): Promise<void> {
        const creditorData = this.mapToRepositoryModel(creditor);
        await CreditorRepository.add(creditorData);
    }
    async inactivate(id: string): Promise<boolean> {
        try {
            await CreditorRepository.inactivate(id);
            return true;
        } catch (error) {
            console.error("Error inactivating creditor:", error);
            return false;
        }
    }

     private mapToRepositoryModel(creditor: Creditor): InferSchemaType<typeof CreditorSchema> {
        return {
            name: creditor.name,
            created_at: creditor.created_at,
            is_active: creditor.is_active
        };
    }
    
}
    