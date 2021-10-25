import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const stringinfoDB = process.env.database_url;

const client = new MongoClient(stringinfoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let infoDB;

const getDB = () => {
    return infoDB;
}

const dBConnect = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error("Error al conectarse a la base de datos");
      return "Error";
    }
    infoDB = db.db("proyectociclo3");
    console.log("Conexión Exitosa");
    return callback();
  });
};

export { dBConnect, getDB };
