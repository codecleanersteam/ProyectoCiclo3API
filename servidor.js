// const express = require("express");
import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { dBConnect } from "./db/database.js";
import rutasProducto from "./views/productos/rutas.js";
import rutasUsuario from "./views/usuarios/rutas.js";
import rutasVenta from "./views/ventas/rutas.js"
import jwt from "express-jwt"
import jwks from "jwks-rsa"

dotenv.config({ path: "./.env" });

const app = Express();
app.use(Express.json());
app.use(Cors());

//Autenticación de Backend
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-pqc1pi-5.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "api-proyectociclo3",
  issuer: "https://dev-pqc1pi-5.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.use(rutasProducto)
app.use(rutasUsuario)
app.use(rutasVenta)

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