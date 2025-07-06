export class DebtDetail {
    debtId:String;
    totalAmount:Number;
    creditorName:String;
    hasAgreement:boolean;

    constructor(debtId:String,totalAmount:Number,creditorName:String,hasAgreement:boolean){
        this.debtId = debtId;
        this.totalAmount = totalAmount;
        this.creditorName = creditorName;
        this.hasAgreement = hasAgreement;
    }
}