import { InferSchemaType } from "mongoose";
import { IAuthService } from "../contracts/iAuthService";
import { User } from "../entitys/user";
import { UserSchema } from "../models/userSchema";
import encrypt from "../shared/encrypt";
import UserRepository from "../repository/userRepository";
import { IDebtService } from "../contracts/iDebtService";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthService implements IAuthService{
    constructor(@inject("IDebtService") private debtService: IDebtService) {}

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
}