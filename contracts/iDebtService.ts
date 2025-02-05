import { Debt } from "../entitys/debt";

export interface IDebtService{
    getByUserId(userId:String):Promise<Debt[]>;
    assignDebt(userId:String,cpf:String):Promise<void>;
}