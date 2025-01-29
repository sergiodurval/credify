import { Creditor } from "../entitys/creditor";

export interface ICreditorService{
    add(creditor:Creditor):Promise<void>;
    activateOrInactivate(id:string,isActive:boolean):Promise<boolean>;
    getAll():Promise<Creditor[]>;
}