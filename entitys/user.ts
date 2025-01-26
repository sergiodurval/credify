import { Base } from "./base";
import {z} from "zod";

const UserValidatorSchema = z.object({
    name: z.string().min(1, "O campo do nome não pode ficar vazio"),
    cpf: z.string().regex(/^\d{11}$/, "O CPF deve conter exatamente 11 dígitos numéricos."),
    email: z.string().email("Endereço de e-mail inválido."),
    password: z.string()
        .min(8, "A senha deve ter pelo menos 8 caracteres.")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
        .regex(/[@$!%*?&#]/, "A senha deve conter pelo menos um caractere especial."),
});

export class User extends Base{
    name:String;
    cpf:String;
    email:String;
    password:String;
    
    constructor(name:String,cpf:String,email:String,password:String){
        super();
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
    }

    
    validate(): boolean {
        const result = UserValidatorSchema.safeParse({
            name: this.name,
            cpf: this.cpf,
            email: this.email,
            password: this.password,
        });

        if(!result.success){
            this.validationErrors = result.error.errors.map(err => err.message);
            return false;
        }

        this.validationErrors = [];
        return true;
    }
}