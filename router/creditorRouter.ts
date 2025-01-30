import "reflect-metadata";
import express,{Request,Response} from 'express';
import {container} from 'tsyringe';
import { CreditorController } from "../controller/creditorController";

const creditorRouter = express();
const creditor = container.resolve(CreditorController);

creditorRouter.route("/").post((req:Request,res:Response)=>{
    return creditor.post(req,res);
});

creditorRouter.route("/activate").post((req:Request,res:Response) =>{
    return creditor.activate(req,res);
});

creditorRouter.route("/inactivate").post((req:Request,res:Response) =>{
    return creditor.inactivate(req,res);
});

creditorRouter.route("/").get((req:Request,res:Response) => {
    return creditor.getAll(req,res);
})

export default creditorRouter;