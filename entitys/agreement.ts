import { Base } from "./base";
import { Installment } from "./installments";
import {z} from "zod";

const AgreementValidatorSchema = z.object({
    debtId:z.string(),
    totalInstallments:z.number(),
    userId:z.string(),
    status:z.string()
});


export class Agreement extends Base {
    debtId:String;
    totalInstallments:Number;
    userId:String;
    status:String;
    Installments:Installment[];

    constructor(debtId:String,userId:String,status:String,Installments:Installment[]){
        super();
        this.debtId = debtId;
        this.totalInstallments = Installments.length;
        this.userId = userId;
        this.status = status;
        this.Installments = Installments
    }

    validate():boolean{
        const result = AgreementValidatorSchema.safeParse({
            debtId:this.debtId,
            totalInstallments:this.totalInstallments,
            userId:this.userId,
            status:this.status,
        });

        if(!result.success){
            this.validationErrors = result.error.errors.map(err => err.message);
            return false;
        }

        this.validationErrors = [];
        return true;
    }
}