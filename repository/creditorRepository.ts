import mongoose,{ InferSchemaType } from "mongoose";
import {CreditorSchema} from '../models/creditorSchema';
const model = mongoose.model('creditor',CreditorSchema);

type Creditor = InferSchemaType<typeof CreditorSchema>;

const CreditorRepository = {
    async add(data:Creditor){
        console.log('banco de dados');
        console.log(data);
        const creditor = new model(data);
        await creditor.save();
    },
    async inactivate(id: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format.");
        }
        await model.updateOne({ _id: id }, { $set: { is_active: false } });
    }
};

export default CreditorRepository;
