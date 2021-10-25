import { getDB } from "../../db/database.js";

const queryAllProducts = async (callback) => {
  const infoDB = getDB();
  await infoDB.collection("producto").find().limit(50).toArray(callback);
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
      infoDB.collection("producto").insertOne(datosProducto, callback);
  } else {
      return "error";
  }
};

export { queryAllProducts, addProduct };
