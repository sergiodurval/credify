import { Base } from "./base";
import {z} from "zod";

const DebtValidatorSchema = z.object({
    cpf: z.string().max(11,"O cpf deve conter no máximo 11 caracteres"),
    userId: z.string(),
    totalAmount: z.number(),
    created_at: z.date(),
    status: z.string(),
    updated_at: z.date().optional(),
    creditorId: z.string()
});

export class Debt extends Base{
    cpf:String;
    userId:String;
    totalAmount:Number;
    created_at:Date;
    status:String;
    updated_at?:Date;
    creditorId:String;
    validationErrors: string[] = [];

    constructor(cpf:String,userId:String,totalAmount:Number,status:String,creditorId:string,updated_at?:Date){
        super();
        this.cpf = cpf;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.created_at = new Date();
        this.creditorId = creditorId;
        this.status = status;
        if(updated_at){
            this.updated_at = updated_at
        }
    }

    validate():boolean{
        const result = DebtValidatorSchema.safeParse({
            cpf:this.cpf,
            userId:this.userId,
            totalAmount:this.totalAmount,
            created_at:this.created_at,
            status:this.status,
            updated_at:this.updated_at,
            creditorId:this.creditorId,
        });

        if(!result.success){
            this.validationErrors = result.error.errors.map(err => err.message);
            return false;
        }

        this.validationErrors = [];
        return true;
    }
}