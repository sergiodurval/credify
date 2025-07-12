export class DebtDetail {
    debtId:String;
    totalAmount:Number;
    creditorName:String;
    hasAgreement:boolean;
    agreementId?:String;
    constructor(debtId:String,totalAmount:Number,creditorName:String,hasAgreement:boolean,agreementId?:String){
        this.debtId = debtId;
        this.totalAmount = totalAmount;
        this.creditorName = creditorName;
        this.hasAgreement = hasAgreement;
        this.agreementId = agreementId;
    }
}