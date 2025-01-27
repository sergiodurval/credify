import { injectable,inject } from "tsyringe";
import { ICreditorService } from "../contracts/iCreditorService";
import { CreditorService } from "../services/creditorService";
import {Request,Response} from 'express';
import { Creditor } from "../entitys/creditor";

@injectable()
export class CreditorController{
   
    constructor(@inject('ICreditorService') private _service:ICreditorService){
        this._service = new CreditorService();
    }

    async post(request:Request,response:Response){
        try{
            const {name,is_active} = request.body;
            const creditor = new Creditor(name,is_active);
            if(creditor.validate()){
                await this._service.add(creditor);
                response.status(201).json({message: 'credor cadastrado com sucesso'});
            }else{
                response.status(400).json(creditor.validationErrors);
            }
        }catch(error){
            console.log(error);
            response.status(500).json({error: 'ocorreu um erro'})
        }
    }

    async inactivate(request:Request,response:Response){
        try{
            const {id} = request.body;
            const result = await this._service.inactivate(id)
            if(result){
                response.status(200).json({message:'credor inativado com sucesso'});
            }else{
                response.status(400).json({message:'credor não localizado'});
            }

        }catch(error){
            response.status(500).json({error: 'ocorreu um erro'})
        }
    }
}