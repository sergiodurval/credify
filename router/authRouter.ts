import "reflect-metadata";
import express,{Request,Response} from 'express';
import {container} from 'tsyringe';
import { AuthController } from "../controller/authController";

const authRouter = express();
const authController = container.resolve(AuthController);

authRouter.route("/register").post((req:Request,res:Response) => {
    return authController.register(req,res);
});

authRouter.route("/login").post((req:Request,res:Response) => {
    return authController.login(req,res);
})

export default authRouter;