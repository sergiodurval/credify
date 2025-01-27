import mongoose from "mongoose";

export const CreditorSchema = new mongoose.Schema({
    name:{type:String},
    created_at:{type:Date},
    is_active:{type:Boolean},
    updated_at:{type:Boolean,require:false}
})