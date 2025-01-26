import { Base } from "./base";
import {z} from "zod";

const InstallmentValidatorSchema = z.object({
    status:z.string(),
    created_at:z.date(),
    updated_at:z.date().optional(),
    amount:z.number()
});

export class Installment extends Base{
    status:String;
    created_at:Date;
    updated_at?:Date;
    amount:Number;

    constructor(status:String,amount:Number,updated_at?:Date){
        super();
         this.status = status;
         this.created_at = new Date();
         this.amount = amount;
         if(updated_at){
            this.updated_at = updated_at;
         }
    }

    validate():boolean{
        const result = InstallmentValidatorSchema.safeParse({
            status:this.status,
            created_at:this.created_at,
            updated_at:this.updated_at,
            amount:this.amount
        });

        if(!result.success){
            this.validationErrors = result.error.errors.map(err => err.message);
            return false;
        }

        this.validationErrors = [];
        return true;
    }
}