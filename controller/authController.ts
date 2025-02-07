import { injectable , inject } from "tsyringe";
import { IAuthService } from "../contracts/iAuthService";
import { Request,Response } from "express";
import { User } from "../entitys/user";
import { Login } from "../entitys/login";

@injectable()
export class AuthController{
    constructor(@inject("IAuthService") private _service: IAuthService) {}

    async register(request:Request,response:Response){
        try{
            const {name,cpf,email,password} = request.body;
            const user = new User(name,cpf,email,password);

            if(!user.validate()){
                response.status(400).json(user.validationErrors);
            }

            const result = await this._service.register(user);
            if(!result){
                response.status(400).json({message:'Ocorreu um erro ao realizar o cadastro'});
            }    
            response.status(201).json({message:'cadastro realizado com sucesso'});
            
        }catch(error){
            console.log(error);
            response.status(500).json({error:`Ocorreu o seguinte erro ao realizar o cadastro:${error}`});
        }
    }

    async login(request:Request,response:Response){
        try{
            const {email,password} = request.body;
            const login = new Login(email,password);
            
            if(!login.validate()){
                response.status(400).json(login.validationErrors);
            }

            const result = await this._service.login(login.email,login.password);
            response.status(200).json({token:result});

        }catch(error){
            console.log(error);
            response.status(500).json({error:`Ocorreu o seguinte erro ao realizar o cadastro:${error}`});
        }
    }
}