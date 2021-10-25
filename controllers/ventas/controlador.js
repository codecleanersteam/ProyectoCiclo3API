import { getDB } from "../../db/database.js";
import { ObjectId } from "mongodb";

const queryAllSales = async (callback) => {
  const infoDB = getDB();
  await infoDB.collection("venta").find().limit(50).toArray(callback);
};

const querySale = async (id, callback) => {
  const infoDB = getDB();
  await infoDB.collection("venta").findOne({ _id: new ObjectId(id)}, callback);
};

const addSale = async (datosSaleo, callback) => {
    const infoDB = getDB();
    await infoDB.collection("venta").insertOne(datosSaleo, callback);
};

const modifySale = async (id, edit, callback) => {
  const filtroSaleo = { _id: new ObjectId(id) };
  const operation = {
    $set: edit,
  };
  const infoDB = getDB();
  await infoDB
    .collection("venta")
    .findOneAndUpdate(
      filtroSaleo,
      operation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const deleteSale = async (id, callback) => {
  const filtroSaleo = { _id: new ObjectId(id) };
  const infoDB = getDB();
  await infoDB.collection("venta").deleteOne(filtroSaleo, callback);
};

export {
  queryAllSales,
  addSale,
  modifySale,
  deleteSale,
  querySale,
};
