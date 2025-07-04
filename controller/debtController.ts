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

                if(!debt || debt.length == 0){
                    response.status(404).json({message:'Não foi encontrado nenhuma divida para o usuário informado'})
                    return;
                }
                
                response.status(200).json(debt);
                return;
            }
        }catch(error){
            console.log(error);
            response.status(500).json({error: 'ocorreu um erro'})
        }
    }

    async getDebtDetail(request:Request,response:Response){
        try{
            const userId = request.user?.id;
            if(userId){
                const debtDetails = await this._service.getDebtDetail(userId);

                if(!debtDetails || debtDetails.length == 0){
                    response.status(404).json({message:'Não foi encontrado nenhuma divida para o usuário informado'})
                }else{
                    response.status(200).json(debtDetails);
                }
            }
        }catch(error){
            console.log(error);
            response.status(500).json({error: 'ocorreu um erro'})
        }
    }

    async getDebtPaymentInfo(request:Request,response:Response){
        try{
            const debtId = request.params.id;
            const debtPaymentInfo = await this._service.getDebtPaymentInfo(debtId);
            if(debtPaymentInfo){
                response.status(200).json(debtPaymentInfo);
            }else{
                response.status(404).json({message:'Não foi encontrado nenhuma divida com o id informado'})
            }
            
        }catch(error){
            console.log(error);
            response.status(500).json({error: 'ocorreu um erro'})
        }
    }
}