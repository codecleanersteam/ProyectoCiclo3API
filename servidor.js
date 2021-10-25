// const express = require("express");
import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { dBConnect } from "./db/database.js";
import rutasProducto from "./views/productos/rutas.js";

dotenv.config({ path: "./.env" });

const app = Express();
app.use(Express.json());
app.use(Cors());
app.use(rutasProducto)

const main = () => {
  return app.listen(process.env.port, () => {
    console.log(`Escuchando en el puerto ${process.env.port}`);
  });
};

dBConnect(main);


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