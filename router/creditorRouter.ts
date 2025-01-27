import "reflect-metadata";
import express,{Application,Request,Response} from 'express';
import {container} from 'tsyringe';
import { CreditorController } from "../controller/creditorController";

const creditorRouter = express();
const creditor = container.resolve(CreditorController);

creditorRouter.route("/api/creditor").post((req:Request,res:Response)=>{
    return creditor.post(req,res);
})

export default creditorRouter;