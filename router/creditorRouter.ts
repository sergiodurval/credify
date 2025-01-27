import "reflect-metadata";
import express,{Request,Response} from 'express';
import {container} from 'tsyringe';
import { CreditorController } from "../controller/creditorController";

const creditorRouter = express();
const creditor = container.resolve(CreditorController);

creditorRouter.route("/api/creditor").post((req:Request,res:Response)=>{
    return creditor.post(req,res);
});

creditorRouter.route("/api/creditor/inactivate").post((req:Request,res:Response) =>{
    return creditor.inactivate(req,res);
});

export default creditorRouter;