import "reflect-metadata";
import express,{Request,Response} from 'express';
import {container} from 'tsyringe';
import { DebtController } from "../controller/debtController";
import { fromCache } from "../middleware/fromCache";
import redis from '../middleware/redis';

const debtRouter = express();
const debtController = container.resolve(DebtController);

debtRouter.route("/").get((req:Request,res:Response) => {
    return debtController.getDebt(req,res);
});

debtRouter.route("/detail").get((req:Request,res:Response) => {
    return debtController.getDebtDetail(req,res);
});


debtRouter.get('/:id', fromCache("debt-payment"), async (req, res) => {
    try {
        const data = await debtController.getDebtPaymentInfo(req);

        if (data) {
            const cacheKey = res.locals.cacheKey;
            await redis.set(cacheKey, JSON.stringify(data), "EX", 60 * 5);
            console.log(`Stored in cache with key: ${cacheKey}`);

            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'Não foi encontrado nenhuma dívida com o id informado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro' });
    }
});

debtRouter.route("/assign").post((req:Request,res:Response) => {
    return debtController.assignDebt(req,res);
});


export default debtRouter;