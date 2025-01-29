import mongoose from "mongoose";

export const CreditorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    created_at:{type:Date,required:true},
    is_active:{type:Boolean,required:true},
    updated_at:{type:Boolean,require:false}
})