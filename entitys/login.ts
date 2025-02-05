import {Base} from "./base";
import {z} from "zod";

const LoginValidatorSchema = z.object({
    email: z.string().email("Endereço de e-mail inválido."),
    password:z.string()
})

export class Login extends Base{
    email:string;
    password:string;

    constructor(email:string,password:string){
        super();
        this.email = email;
        this.password = password;
    }

    validate():boolean{
        const result = LoginValidatorSchema.safeParse({
            email:this.email,
            password:this.password
        });

        if(!result.success){
            this.validationErrors = result.error.errors.map(err => err.message);
            return false;
        }

        this.validationErrors = [];
        return true;
    }
}