import { injectable,inject } from "tsyringe";
import { ICreditorService } from "../contracts/iCreditorService";
import { CreditorService } from "../services/creditorService";
import {Request,Response} from 'express';
@injectable()
export class CreditorController{
   
    constructor(@inject('ICreditorService') private _service:ICreditorService){
        this._service = new CreditorService();
    }

    async post(request:Request,response:Response){
        try{
            throw new Error('not implemented');
        }catch(error){
            response.status(500).json({error: 'ocorreu um erro'})
        }
    }
}