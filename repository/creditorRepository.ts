import mongoose,{ InferSchemaType } from "mongoose";
import CreditorModel, { ICreditor } from "../models/creditorSchema";
import {CreditorSchema} from '../models/creditorSchema';
const model = mongoose.model('creditor',CreditorSchema);

type Creditor = InferSchemaType<typeof CreditorSchema>;


const CreditorRepository = {
    async add(data:Creditor){
        const creditor = new model(data);
        await creditor.save();
    },
    async activateOrInactivate(id: string , isActive:boolean): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format.");
        }
        await model.updateOne({ _id: id }, { $set: { is_active: isActive } });
    },
    async getAll():Promise<Creditor[]>{
        const query = {};
        const creditors = await model.find(query);
        return creditors;
    },
    async getRandomCreditor(): Promise<ICreditor | null> {
        const count = await CreditorModel.countDocuments();
        if (count === 0) return null;

        const randomIndex = Math.floor(Math.random() * count);
        return await CreditorModel.findOne().skip(randomIndex);
    }
};

export default CreditorRepository;
