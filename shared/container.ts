import "reflect-metadata";
import {container} from 'tsyringe';
import { CreditorService } from "../services/creditorService";
import { AuthService } from "../services/authService";
import { DebtService } from "../services/debtService";

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

container.register(
    "IDebtService",{
        useClass:DebtService
    }
);