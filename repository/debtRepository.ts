import mongoose, { InferSchemaType } from "mongoose";
import { DebtSchema } from "../models/debtSchema";
const model = mongoose.model('debt',DebtSchema);

type Debt = InferSchemaType<typeof DebtSchema>;

const DebtRepository = {
    async add(cpf:String,userId:String,totalAmount:Number,created_at:Date,status:String,creditorId:String){
        const debt = new model({
            cpf:cpf,
            userId:userId,
            totalAmount:totalAmount,
            status:status,
            creditorId:creditorId
        });
        await debt.save();
    }
};

export default DebtRepository;