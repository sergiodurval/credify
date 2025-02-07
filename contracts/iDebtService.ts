import { Debt } from "../entitys/debt";
import { DebtDetail } from "../entitys/debtDetail";

export interface IDebtService{
    getByUserId(userId:String):Promise<Debt[]>;
    assignDebt(userId:String,cpf:String):Promise<void>;
    getDebtDetail(userId:String):Promise<DebtDetail[]>;
}