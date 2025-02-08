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
    },
    async getByUserId(userId:String): Promise<Debt[]>{
        const debt = await model.find({userId:userId});
        return debt;
    },
    async getById(debtId:String): Promise<Debt | null>{
        return await model.findOne({_id:debtId});
    }
};

export default DebtRepository;