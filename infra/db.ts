import mongoose from "mongoose";

class Database{
    private DB_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/credify";


    /**
    * Database
    * @summary Cria a conexão com o mongodb
    */
    createConnection() {
        mongoose.connect(this.DB_URL, {
        }).then(() => {
            console.log("Connected to MongoDB");
        }).catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
    }
}

export default Database;