import mongoose from "mongoose";

export const DebtSchema = new mongoose.Schema({
    cpf:{type:String},
    userId:{type: mongoose.Schema.Types.ObjectId, required: true , ref:'User'},
    totalAmount:{type:mongoose.Types.Decimal128},
    created_at:{type:Date},
    status:{type:String},
    updated_at:{type:Date},
    creditorId:{type: mongoose.Schema.Types.ObjectId, required: true , ref:'Creditor'}
})