import { injectable,inject } from "tsyringe";
import { IDebtService } from "../contracts/iDebtService";
import { DebtService } from "../services/debtService";
import {Request,Response} from 'express';

@injectable()
export class DebtController{

    constructor(@inject('IDebtService') private _service:IDebtService){
        this._service = new DebtService();
    }

    async getDebt(request:Request,response:Response){
        try{
            const userId = request.user?.id;
            if(userId){
                const debt = await this._service.getByUserId(userId);
                if(!debt){
                    response.status(401).json({message:'Não foi encontrado nenhuma divida para o usuário informado'})
                }
                response.status(200).json(debt);
            }
        }catch(error){
            console.log(error);
            response.status(500).json({error: 'ocorreu um erro'})
        }
    }
}