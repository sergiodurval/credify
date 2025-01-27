import "reflect-metadata";
import { CreditorController } from "./controller/creditorController";
import { container } from "tsyringe";
import './shared/container';

class StartUp{
    private creditor = container.resolve(CreditorController);
}