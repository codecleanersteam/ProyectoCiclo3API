import { getDB } from "../../db/database.js";
import { ObjectId } from "mongodb";
import jwt_decode from "jwt-decode";
import { response } from "express";

const queryAllUsers = async (callback) => {
  const infoDB = getDB();
  await infoDB.collection("usuario").find().limit(50).toArray(callback);
};

const queryUser = async (id, callback) => {
  const infoDB = getDB();
  await infoDB
    .collection("usuario")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const consultarOCrearUsuario = async (request, callback) => {
  //6.1. Obtener los datos del usuario desde el token
  const token = request.headers.authorization.split("Bearer ")[1];
  // console.log("Token", jwt_decode(token));
  const user = jwt_decode(token)["http://localhost/userData"];
  console.log(user);
  //6.2. Con el correo del usuario o con el id de Auth0, veridficar si el usuario ya esta en la DB o no.
  const infoDB = getDB();
  await infoDB
    .collection("usuario")
    .findOne({ email: user.email }, async (err, response) => {
      console.log("Respuesta consulta a Base de Datos:", response);
      if (response) {
        //7.1 Si el usuario no esta en la DB, lo crea u devuelve la info
        callback(err, response);
      } else {
        //7.2. Si el usuario uya esta en la BD, se devuelve la info del usuario
        user.auth0ID = user._id;
        delete user._id;
        user.rol = "Inactivo"
        await addUser(user, (err, respuesta) => { callback(err, user)
          // console.log("Respuesta de Creación del Usuario", respuesta);
        });
      }
    });
};

const addUser = async (datosUser, callback) => {
  const infoDB = getDB();
  await infoDB.collection("usuario").insertOne(datosUser, callback);
};

const modifyUser = async (id, edit, callback) => {
  const filtroUser = { _id: new ObjectId(id) };
  const operation = {
    $set: edit,
  };
  const infoDB = getDB();
  await infoDB
    .collection("usuario")
    .findOneAndUpdate(
      filtroUser,
      operation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const deleteUser = async (id, callback) => {
  const filtroUser = { _id: new ObjectId(id) };
  const infoDB = getDB();
  await infoDB.collection("usuario").deleteOne(filtroUser, callback);
};

export {
  queryAllUsers,
  addUser,
  modifyUser,
  deleteUser,
  queryUser,
  consultarOCrearUsuario,
};
