import "reflect-metadata";
import './shared/container';
import express,{Application,Request,Response} from 'express';
import database from './infra/db';
import creditorRouter from "./router/creditorRouter";
import dotenv from 'dotenv';


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
        this.app.route("/").get((req,res) => {
            res.send({versao: "0.0.1"});
        });
        
        this.app.use(express.json());
        this.app.use("/",creditorRouter);
    }
}

export default new StartUp();