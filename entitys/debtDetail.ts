export class DebtDetail {
    debtId:String;
    totalAmount:Number;
    creditorName:String;

    constructor(debtId:String,totalAmount:Number,creditorName:String){
        this.debtId = debtId;
        this.totalAmount = totalAmount;
        this.creditorName = creditorName
    }
}