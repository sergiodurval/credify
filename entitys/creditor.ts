import { Base } from "./base";
import {z} from "zod";

// Define a schema for validation
const CreditorValidatorSchema = z.object({
    name: z.string().min(1, "O nome não pode ser vazio."),
    created_at: z.date(),
    is_active: z.boolean(),
    updated_at: z.date().optional(),
});

export class Creditor extends Base {
    name:string;
    created_at:Date;
    is_active:boolean;
    updated_at?:Date;

    constructor(name:string,is_active:boolean,updated_at?:Date){
        super();
        this.name = name;
        this.created_at = new Date();
        this.is_active = is_active;
        if(updated_at){
            this.updated_at = updated_at;
        }
    }

    // Method to validate using zod, returning a boolean
    validate(): boolean {
        const result = CreditorValidatorSchema.safeParse({
            name: this.name,
            created_at: this.created_at,
            is_active: this.is_active,
            updated_at: this.updated_at,
        });

        if (!result.success) {
            this.validationErrors = result.error.errors.map(err => err.message);
            return false;
        }

        this.validationErrors = [];
        return true;
    }

    //exemplo de uso
    // Example usage with errors:
    /*const invalidCreditor = new Creditor("", true, "invalid-date" as any);
        if (!invalidCreditor.validate()) {
            console.log("Errors:", invalidCreditor.validationErrors);
        }*/
}