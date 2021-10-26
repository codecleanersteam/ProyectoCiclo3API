import Express from "express";
import { queryAllProducts, addProduct, modifyProduct, deleteProduct, queryProduct } from "../../controllers/productos/controlador.js";

const rutasProducto = Express.Router();

const genericCallback = (response) => (err, result) => {
  if (err) {
    console.log("error", err)
    // response.status(500).send("Error de comunicación con la base de datos");
    response.status(500).json({error: err})
  } else {
    response.json(result);
  }
};  



rutasProducto.route("/products").get((request, response) => {
    console.log("Alguien hizo una petición en la ruta /productos");
    queryAllProducts(genericCallback(response));
});

rutasProducto.route("/products").post((request, response) => {
    // console.log("Esto es una solicitud POST a /products/add")
    // console.log("Producto a Crear:", request.body)
    // response.send("Su producto se ha creado exitosamente")
    addProduct(request.body, genericCallback(response))
});

rutasProducto.route("/products/:id").patch((request, response) => {
    modifyProduct(request.params.id, request.body, genericCallback(response))
});

rutasProducto.route("/products/:id").delete((request, response) => {
    deleteProduct(request.params.id, genericCallback(response))
});



rutasProducto.route("/products/:id").get((request, response) => {
  console.log("Alguien hizo una petición en la ruta /productos");
  queryProduct(request.params.id, genericCallback(response));
});
export default rutasProducto;
