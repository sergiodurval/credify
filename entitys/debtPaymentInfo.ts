import { InstallmentPayment } from "./installmentPayment";

export class DebtPaymentInfo {
    debtId:String;
    totalAmount:Number;
    creditorName:String;
    minimumInstallments:Number;
    maximumInstallments:Number;
    instalmentsPayment:InstallmentPayment[];

    constructor(debtId:String,totalAmount:Number,creditorName:String,minimumInstallments:Number,maximumInstallments:Number,installmentsPayment:InstallmentPayment[]){
        this.debtId = debtId;
        this.totalAmount = totalAmount;
        this.creditorName = creditorName;
        this.minimumInstallments = minimumInstallments;
        this.maximumInstallments = maximumInstallments;
        this.instalmentsPayment = installmentsPayment;
    }
}