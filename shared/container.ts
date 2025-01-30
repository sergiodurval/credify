import "reflect-metadata";
import {container} from 'tsyringe';
import { CreditorService } from "../services/creditorService";
import { AuthService } from "../services/authService";

container.register(
    "ICreditorService",{
        useClass:CreditorService
    }
);

container.register(
    "IAuthService",{
        useClass:AuthService
    }
);