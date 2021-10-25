import { getDB } from "../../db/database.js";
import { ObjectId } from "mongodb";

const queryAllUsers = async (callback) => {
  const infoDB = getDB();
  await infoDB.collection("usuario").find().limit(50).toArray(callback);
};

const queryUser = async (id, callback) => {
  const infoDB = getDB();
  await infoDB.collection("usuario").findOne({ _id: new ObjectId(id)}, callback);
};

const addUser = async (datosUsero, callback) => {
    const infoDB = getDB();
    await infoDB.collection("usuario").insertOne(datosUsero, callback);
};

const modifyUser = async (id, edit, callback) => {
  const filtroUsero = { _id: new ObjectId(id) };
  const operation = {
    $set: edit,
  };
  const infoDB = getDB();
  await infoDB
    .collection("usuario")
    .findOneAndUpdate(
      filtroUsero,
      operation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const deleteUser = async (id, callback) => {
  const filtroUsero = { _id: new ObjectId(id) };
  const infoDB = getDB();
  await infoDB.collection("usuario").deleteOne(filtroUsero, callback);
};

export {
  queryAllUsers,
  addUser,
  modifyUser,
  deleteUser,
  queryUser,
};
