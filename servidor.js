// const express = require("express");
import Express, { response } from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { dBConnect, getDB } from "./db/database.js";

dotenv.config({ path: "./.env" });

const app = Express();
app.use(Express.json());
app.use(Cors());

app.get("/products", (request, response) => {
  console.log("Alguien hizo una petición en la ruta /productos");
  const infoDB = getDB();
  infoDB
    .collection("producto")
    .find({})
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        response.status(500).send("Error consultando la lista de productos");
      } else {
        response.json(result);
      }
    });
  //   const productos = [
  //     {
  //       nombre: "iPhone 13",
  //       marca: "apple",
  //       modelo: "A1890",
  //       valorunitario: 5499000,
  //       estado: "Disponible",
  //     },
  //     {
  //       nombre: "Galaxy S21",
  //       marca: "samsung",
  //       modelo: "GM-880T",
  //       valorunitario: 4499000,
  //       estado: "No Disponible",
  //     },
  //   ];
  //   // response.send("Hola Mundo, soy una ruta GET en Express ahora tenemos Nodemon")
  //   response.send(productos);
});

app.post("/products/add", (request, response) => {
  // console.log("Esto es una solicitud POST a /products/add")
  // console.log("Producto a Crear:", request.body)
  // response.send("Su producto se ha creado exitosamente")
  const datosProducto = request.body;
  try {
    if (
      Object.keys(datosProducto).includes("nombre") &&
      Object.keys(datosProducto).includes("marca") &&
      Object.keys(datosProducto).includes("modelo") &&
      Object.keys(datosProducto).includes("valorunitario") &&
      Object.keys(datosProducto).includes("estado")
    ) {
      const infoDB = getDB();
      infoDB.collection("producto").insertOne(datosProducto, (err, result) => {
        if (err) {
          console.error(err);
          response.sendStatus(500);
        } else {
          console.log(result);
          response.sendStatus(200);
        }
      });
    } else {
      response.sendStatus(500);
    }
  } catch {
    response.sendStatus(500);
  }
});

app.patch("/products/modify", (request, response) => {
  const edit = request.body;
  console.log(edit);
  const filtroProducto = { _id: new ObjectId(edit.id) };
  delete edit.id;
  const operation = {
    $set: edit,
  };
  const infoDB = getDB();
  infoDB
    .collection("producto")
    .findOneAndUpdate(
      filtroProducto,
      operation,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error("Error actualizando el producto:", err);
          response.sendStatus(500);
        } else {
          console.log("Producto actualizado con exito");
          response.sendStatus(200);
        }
      }
    );
});

app.delete("/products/delete", (request, response) => {
  const filtroProducto = { _id: new ObjectId(request.body.id) };
  const infoDB = getDB();
  infoDB.collection("producto").deleteOne(filtroProducto, (err, result) => {
    if (err) {
      console.error(err);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
});

const main = () => {
  return app.listen(process.env.port, () => {
    console.log(`Escuchando en el puerto ${process.env.port}`);
  });
};

dBConnect(main);
