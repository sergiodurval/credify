import mongoose from "mongoose";
import { Base } from "./base";
import {z} from "zod";

const CreditorValidatorSchema = z.object({
    name: z.string().min(1, "O nome não pode ser vazio."),
    created_at: z.date(),
    is_active: z.boolean(),
    updated_at: z.date().optional(),
});

export class Creditor extends Base {
    name:string;
    created_at:Date;
    is_active:boolean;
    updated_at?:Date;
    
    constructor(name:string,is_active:boolean,created_at?:Date,updated_at?:Date){
        super();
        this.name = name;
        
        if(created_at){
            this.created_at = created_at;
        }else{
            this.created_at = this.getCurrentDate();
        }

        this.is_active = is_active;
        if(updated_at){
            this.updated_at = updated_at;
        }
    }

    validate(): boolean {
        const result = CreditorValidatorSchema.safeParse({
            name: this.name,
            created_at: this.created_at,
            is_active: this.is_active,
            updated_at: this.updated_at,
        });

        if (!result.success) {
            this.validationErrors = result.error.errors.map(err => err.message);
            return false;
        }

        this.validationErrors = [];
        return true;
    }

    getCurrentDate():Date{
        const date = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        return new Date(formattedDate);
    }

    
}