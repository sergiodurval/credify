import "reflect-metadata";
import express,{Request,Response} from 'express';
import {container} from 'tsyringe';
import { DebtController } from "../controller/debtController";

const debtRouter = express();
const debtController = container.resolve(DebtController);

debtRouter.route("/").get((req:Request,res:Response) => {
    return debtController.getDebt(req,res);
})

export default debtRouter;