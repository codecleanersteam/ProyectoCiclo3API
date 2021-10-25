import Express from "express";
import { queryAllProducts, addProduct, modifyProduct } from "../../controllers/productos/controlador.js";
import { getDB } from "../../db/database.js";

const rutasProducto = Express.Router();

const genericCallback = (response) => (err, result) => {
  if (err) {
    response.status(500).send("Error consultando la lista de productos");
  } else {
    response.json(result);
  }
};  

rutasProducto.route("/products").get((request, response) => {
  console.log("Alguien hizo una petición en la ruta /productos");
  queryAllProducts(genericCallback(response));
});

rutasProducto.route("/products/add").post((request, response) => {
  // console.log("Esto es una solicitud POST a /products/add")
  // console.log("Producto a Crear:", request.body)
  // response.send("Su producto se ha creado exitosamente")
    addProduct(request.body, genericCallback(response))
});

rutasProducto.route("/products/modify").patch((request, response) => {
    modifyProduct(request.body, genericCallback(response))
});

rutasProducto.route("/products/delete").delete((request, response) => {
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

export default rutasProducto;
