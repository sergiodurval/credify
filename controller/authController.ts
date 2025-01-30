import { injectable , inject } from "tsyringe";
import { IAuthService } from "../contracts/iAuthService";
import { AuthService } from "../services/authService";
import { Request,Response } from "express";
import { User } from "../entitys/user";

@injectable()
export class AuthController{
    constructor(@inject('IAuthService') private _service:IAuthService){
        this._service = new AuthService();
    }

    async post(request:Request,response:Response){
        try{
            const {name,cpf,email,password} = request.body;
            const user = new User(name,cpf,email,password);

            if(user.validate()){

                const result = await this._service.register(user);

                if(!result){
                    response.status(400).json({message:'Ocorreu um erro ao realizar o cadastro'});
                }
                
                response.status(201).json({message:'cadastro realizado com sucesso'});

            }else{
                response.status(400).json(user.validationErrors);
            }
            
        }catch(error){
            console.log(error);
            response.status(500).json({error:`Ocorreu o seguinte erro ao realizar o cadastro:${error}`});
        }
    }
}