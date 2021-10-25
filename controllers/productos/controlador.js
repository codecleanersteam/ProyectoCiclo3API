import { getDB } from "../../db/database.js";
import { ObjectId } from "mongodb";

const queryAllProducts = async (callback) => {
  const infoDB = getDB();
  await infoDB.collection("producto").find().limit(50).toArray(callback);
};

const queryProduct = async (id, callback) => {
  const infoDB = getDB();
  await infoDB.collection("producto").findOne({ _id: new ObjectId(id)}, callback);
};

const addProduct = async (datosProducto, callback) => {
  if (
    Object.keys(datosProducto).includes("nombre") &&
    Object.keys(datosProducto).includes("marca") &&
    Object.keys(datosProducto).includes("modelo") &&
    Object.keys(datosProducto).includes("valorunitario") &&
    Object.keys(datosProducto).includes("estado")
  ) {
    const infoDB = getDB();
    await infoDB.collection("producto").insertOne(datosProducto, callback);
  } else {
    return "error";
  }
};

const modifyProduct = async (id, edit, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const operation = {
    $set: edit,
  };
  const infoDB = getDB();
  await infoDB
    .collection("producto")
    .findOneAndUpdate(
      filtroProducto,
      operation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const deleteProduct = async (id, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const infoDB = getDB();
  await infoDB.collection("producto").deleteOne(filtroProducto, callback);
};

export {
  queryAllProducts,
  addProduct,
  modifyProduct,
  deleteProduct,
  queryProduct,
};
