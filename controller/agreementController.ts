import { injectable,inject } from "tsyringe";
import { IAgreementService } from "../contracts/iAgreementService";
import { AgreementService } from "../services/agreementService";
import {Request,Response} from 'express';

@injectable()
export class AgreementController{
    constructor(@inject('IAgreementService')private _service:IAgreementService){
        this._service = new AgreementService();
    }

    async getAll(request:Request,response:Response){
        try{
            const userId = request.user?.id;
            if(userId){
                const agreements = await this._service.getAll(userId);
                if(!agreements || agreements.length == 0){
                    response.status(404).json({message:'Não foi encontrado nenhum acordo para o usuário informado'});
                }else{
                    response.status(200).json(agreements);
                }
            }
        }catch(error){
            console.log(error);
            response.status(500).json({error:`ocorreu o seguinte erro ao listar os acordos:${error}`});
        }
    }

    async getById(request:Request,response:Response){
        try{
            const agreementId = request.params.id;
            if(agreementId){
                const agreement = await this._service.getById(agreementId);
                if(!agreement){
                    response.status(404).json({message:'Não foi encontrado o acordo com id informado'});
                }
                response.status(200).json({agreement});
            }
        }catch(error){
            console.log(error);
            response.status(500).json({error:`ocorreu o seguinte erro ao obter o acordo:${error}`});
        }
    }
}