// const express = require("express");
import Express, { response } from "express";

const app = Express();
app.use(Express.json());

app.get("/products", (request, response) => {
  console.log("Alguien hizo una petición en la ruta /productos");
  const productos = [
    {
      nombre: "iPhone 13",
      marca: "apple",
      modelo: "A1890",
      valorunitario: 5499000,
      estado: "Disponible",
    },
    {
      nombre: "Galaxy S21",
      marca: "samsung",
      modelo: "GM-880T",
      valorunitario: 4499000,
      estado: "No Disponible",
    },
  ];
  // response.send("Hola Mundo, soy una ruta GET en Express ahora tenemos Nodemon")
  response.send(productos);
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
      response.sendStatus(200);
    } else {
      response.sendStatus(500);
    }
  } catch {
    response.sendStatus(500);
  }
});

app.listen(3001, () => {
  console.log("Escuchando en el puerto 3001");
});
