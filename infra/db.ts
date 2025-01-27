import mongoose from "mongoose";

class Database{
    private DB_URL = "mongodb://localhost:27017/credify";


    /**
    * Database
    * @summary Cria a conexão com o mongodb
    */
    createConnection(){
        mongoose.connect(this.DB_URL);
    }
}

export default Database;