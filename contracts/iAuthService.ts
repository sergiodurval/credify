import { User } from "../entitys/user";

export interface IAuthService{
    register(user:User):Promise<boolean>;
}