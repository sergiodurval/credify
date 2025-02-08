
import {z} from 'zod';
import {Base} from './base';

const CreateAgreementValidatorSchema = z.object({
    debtId:z.string(),
    totalInstallment: z.number(),
});

export class CreateAgreement extends Base {
    debtId:string;
    totalInstallment:number;

    constructor(debtId:string,totalInstallment:number){
        super();
        this.debtId = debtId;
        this.totalInstallment = totalInstallment;
    }

    validate():boolean{
        const result = CreateAgreementValidatorSchema.safeParse({
            debtId:this.debtId,
            totalInstallment:this.totalInstallment,
        });

        if(!result.success){
            this.validationErrors = result.error.errors.map(err => err.message);
            console.log(this.validationErrors);
            return false;
        }

        this.validationErrors = [];
        return true;
    }
}