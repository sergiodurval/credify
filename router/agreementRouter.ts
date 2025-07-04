import "reflect-metadata";
import express,{Request,Response,NextFunction} from 'express';
import {container} from 'tsyringe';
import { AgreementController } from "../controller/agreementController";
import { fromCache } from "../middleware/fromCache";
import redis from '../middleware/redis';

const agreementRouter = express();
const agreementController = container.resolve(AgreementController);

agreementRouter.route("/").get((req:Request,res:Response) => {
    return agreementController.getAll(req,res);
});

agreementRouter.get(
    "/:id",
    fromCache("agreement"),
    async (req: Request, res: Response) => {
      const data = await agreementController.getById(req);
      
      if (res.statusCode === 200 && data) {
        const cacheKey = res.locals.cacheKey;
        await redis.set(cacheKey, JSON.stringify(data), "EX", 60 * 5); // Cache for 5 minutes
      }
  
      res.json(data);
    }
  );

agreementRouter.route('/').post((req:Request,res:Response) => {
    return agreementController.create(req,res);
});

export default agreementRouter;