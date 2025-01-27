import "reflect-metadata";
import {container} from 'tsyringe';
import { CreditorService } from "../services/creditorService";

container.register(
    "ICreditorService",{
        useClass:CreditorService
    }
);