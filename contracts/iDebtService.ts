import { Debt } from "../entitys/debt";
import { DebtDetail } from "../entitys/debtDetail";
import { DebtPaymentInfo } from "../entitys/debtPaymentInfo";

export interface IDebtService{
    getByUserId(userId:String):Promise<Debt[]>;
    assignDebt(userId:String):Promise<void>;
    getDebtDetail(userId:String):Promise<DebtDetail[]>;
    getDebtPaymentInfo(debtId:String):Promise<DebtPaymentInfo | null>;
}