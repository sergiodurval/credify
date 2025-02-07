import "reflect-metadata";
import express,{Request,Response} from 'express';
import {container} from 'tsyringe';
import { AgreementController } from "../controller/agreementController";

const agreementRouter = express();
const agreementController = container.resolve(AgreementController);

agreementRouter.route("/").get((req:Request,res:Response) => {
    return agreementController.getAll(req,res);
});

agreementRouter.route('/:id').get((req:Request,res:Response) => {
    return agreementController.getById(req,res);
})

export default agreementRouter;