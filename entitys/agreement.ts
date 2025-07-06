import mongoose from "mongoose";
import { Base } from "./base";
import { Installment } from "./installments";
import {z} from "zod";

const AgreementValidatorSchema = z.object({
    agreementId:z.string(),
    debtId:z.string(),
    totalInstallments:z.number(),
    userId:z.string(),
    status:z.string()
});


export class Agreement extends Base {
    agreementId:string;
    debtId:string;
    totalAmount:Number;
    totalInstallments:Number;
    userId:String;
    status:String;
    Installments:Installment[];

    constructor(agreementId:string, debtId:string,userId:string,status:string,totalAmount:Number,Installments:Installment[]){
        super();
        this.agreementId = agreementId;
        this.debtId = debtId;
        this.totalInstallments = Installments.length;
        this.userId = userId;
        this.status = status;
        this.totalAmount = totalAmount;
        this.Installments = Installments
    }

    validate():boolean{
        const result = AgreementValidatorSchema.safeParse({
            agreementId:this.agreementId,
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

     toJSON() {
        return {
            agreementId:this.agreementId,
            debtId: this.debtId,
            totalAmount:this.totalAmount,
            totalInstallments: this.totalInstallments,
            userId: this.userId,
            status: this.status,
            Installments: this.Installments.map(i => i.toJSON ? i.toJSON() : i)
        };
    }
}