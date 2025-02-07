import { Agreement } from "../entitys/agreement";

export interface IAgreementService{
   getAll(userId:string):Promise<Agreement[]>;
   getById(agreementId:string):Promise<Agreement>;
   create(agreement:Agreement):Promise<void>;
}