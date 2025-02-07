import mongoose, { InferSchemaType } from "mongoose";
import { AgreementSchema } from "../models/agreementSchema";

const model = mongoose.model('agreement', AgreementSchema);
type Agreement = InferSchemaType<typeof AgreementSchema>;

const AgreementRepository = {
    async getAgreementByDebtId(debtId: string): Promise<Agreement | null> {
        if (!mongoose.Types.ObjectId.isValid(debtId)) {
            throw new Error("Invalid debtId format");
        }

        const agreement = await model.findOne({ debtId: new mongoose.Types.ObjectId(debtId) });
        return agreement;
    },
    async getById(agreementId:string):Promise<Agreement | null>{
        if (!mongoose.Types.ObjectId.isValid(agreementId)) {
            throw new Error("Invalid debtId format");
        }

        const agreement = await model.findOne({ _id: new mongoose.Types.ObjectId(agreementId) });
        return agreement;
    }
};

export default AgreementRepository;
