import mongoose from "mongoose";

export const CreditorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    created_at:{type:Date,required:true},
    is_active:{type:Boolean,required:true},
    updated_at:{type:Boolean,require:false}
})

// Define Type
export interface ICreditor extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    created_at: Date;
    is_active: boolean;
    updated_at?: Date;
}

// Create Model
const CreditorModel = mongoose.model<ICreditor>("creditor", CreditorSchema);

export default CreditorModel;