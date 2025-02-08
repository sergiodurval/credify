import mongoose, { InferSchemaType, Model } from "mongoose";
import { AgreementSchema } from "../models/agreementSchema";
import { AgreementStatus } from "../enums/agreementStatus";

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
    },
    async add(debtId:string,amount:number,totalInstallment:number,installments:any[],userId:string):Promise<void>{
        const agreement = new model({
                  debtId: new mongoose.Types.ObjectId(debtId),
                  userId: new mongoose.Types.ObjectId(userId),
                  totalInstallments: totalInstallment,
                  amount: new mongoose.Types.Decimal128(amount.toFixed(2)),
                  status: AgreementStatus.IN_AGREEMENT,
                  installments,
                  created_at: new Date(),
                  updated_at: new Date(),
                });
        await agreement.save();
    }
};

export default AgreementRepository;
