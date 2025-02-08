import { Agreement } from "../entitys/agreement";
import { CreateAgreement } from "../entitys/createAgreement";

export interface IAgreementService{
   getAll(userId:string):Promise<Agreement[]>;
   getById(agreementId:string):Promise<Agreement>;
   create(createAgreement:CreateAgreement):Promise<void>;
   validateAlreadyExistAgreement(debtId:string):Promise<boolean>;
}