import { InferSchemaType } from "mongoose";
import { IAuthService } from "../contracts/iAuthService";
import { User } from "../entitys/user";
import { UserSchema } from "../models/userSchema";
import encrypt from "../shared/encrypt";
import UserRepository from "../repository/userRepository";
import { IDebtService } from "../contracts/iDebtService";
import { inject, injectable } from "tsyringe";
import jwt,{Secret } from 'jsonwebtoken';
import 'dotenv/config';

@injectable()
export class AuthService implements IAuthService{
    constructor(@inject("IDebtService") private debtService: IDebtService) {}

    async login(email: string, password: string): Promise<string> {
        try{
            const user = await UserRepository.findByEmail(email);
            if(!user){
                throw new Error('Usuário não encontrado');
            }

            const isPasswordValid = await encrypt.comparePassword(password,user.password);
            
            if (!isPasswordValid) {
                throw new Error('Usuário ou senha inválido');
            }
            
            const userPayload = { id: user._id.toString(), email: user.email };
            const accessToken = this.generateAccessToken(userPayload);
            return accessToken;
        }catch(error){
            throw error;
        }
    }

    async register(user: User): Promise<boolean> {
        user.password = await encrypt.hashPassword(user.password.toString());
        user.cpf = user.cpf.replace(/[.-]/g, '');
        const userData = this.mapModelToRepository(user);
        try{
            const userId = await UserRepository.register(userData);
            await this.debtService.assignDebt(userId,userData.cpf);
            return true;
        }catch(error){
            return false;
        }
    }
    
    private mapModelToRepository(user: User): InferSchemaType<typeof UserSchema> {
            return {
                name: user.name.toString(),
                cpf: user.cpf.toString(),
                email:user.email.toString(),
                password:user.password.toString() 
            };
    }

    private generateAccessToken(userPayload: { id: string; email: string }): string {
        const secret: Secret | undefined = process.env.JWT_ACCESS_SECRET;
        const expirationTime: number = parseInt(process.env.ACCESS_TOKEN_EXPIRY || "15", 10) * 60;

        if (!secret) {
            throw new Error("JWT_ACCESS_SECRET não está definido.");
        }
    
        const accessToken = jwt.sign({id: userPayload.id,email:userPayload.email,},secret,{expiresIn:expirationTime})
        return accessToken;
    }
      
}