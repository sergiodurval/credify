import { Debt } from "../entitys/debt";

export interface IDebtService{
    getById(userId:String):Promise<Debt[]>;
}