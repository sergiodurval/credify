import "reflect-metadata";
import './shared/container';
import express,{Application,Request,Response} from 'express';
import database from './infra/db';
import creditorRouter from "./router/creditorRouter";
import dotenv from 'dotenv';
import authRouter from "./router/authRouter";
import { verifyJwt } from "./middleware/verifyJwt";
import debtRouter from "./router/debtRouter";
import agreementRouter from "./router/agreementRouter";
import { swaggerDocs } from './infra/swagger'; 
class StartUp{
    public app:Application;
    private _db: database = new database();

    constructor(){
        dotenv.config();
        this.app = express();

        this._db.createConnection();
        this.routes();
    }
    routes(){
        this.app.route("/api").get((req,res) => {
            res.send({versao: "0.0.1"});
        });
        
        this.app.use(express.json());
        this.app.use("/api/creditor",creditorRouter);
        this.app.use("/api/auth",authRouter);
        this.app.use("/api/debt",verifyJwt,debtRouter);
        this.app.use('/api/agreement',verifyJwt,agreementRouter);
        swaggerDocs(this.app);
    }
}

export default new StartUp();