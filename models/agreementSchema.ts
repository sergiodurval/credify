import mongoose from "mongoose";

export const AgreementSchema = new mongoose.Schema({
    debtId:{type: mongoose.Schema.Types.ObjectId, required: true , ref:'Debt'},
    totalInstallments:{type:Number},
    installments: [{
        status: { type: String },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
        amount: { type: mongoose.Types.Decimal128 }
    }],
    userId:{type: mongoose.Schema.Types.ObjectId, required: true , ref:'User'},
    status:{type:String}
})