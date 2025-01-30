import "reflect-metadata";
import express,{Request,Response} from 'express';
import {container} from 'tsyringe';
import { AuthController } from "../controller/authController";

const authRouter = express();
const auth = container.resolve(AuthController);

authRouter.route("/register").post((req:Request,res:Response) => {
    return auth.post(req,res);
})

export default authRouter;