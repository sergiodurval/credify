import { User } from "../entitys/user";
import { UserResponse } from "../entitys/userResponse";

export interface IAuthService{
    register(user:User):Promise<boolean>;
    login(email:string,password:string):Promise<UserResponse>;
}