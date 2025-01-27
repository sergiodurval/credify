import { Creditor } from "../entitys/creditor";

export interface ICreditorService{
    add(creditor:Creditor):Promise<void>;
    inactivate(id:string):Promise<boolean>;
}