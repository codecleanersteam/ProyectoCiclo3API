import Express from "express";
import { queryAllSales, addSale, modifySale, deleteSale, querySale } from "../../controllers/ventas/controlador.js";

const rutasVenta = Express.Router();

const genericCallback = (response) => (err, result) => {
  if (err) {
    response.status(500).send("Error de comunicación con la base de datos");
  } else {
    response.json(result);
  }
};  



rutasVenta.route("/sales").get((request, response) => {
    console.log("Alguien hizo una petición en la ruta /ventas");
    queryAllSales(genericCallback(response));
});

rutasVenta.route("/sales").post((request, response) => {
    addSale(request.body, genericCallback(response))
});

rutasVenta.route("/sales/:id").patch((request, response) => {
    modifySale(request.params.id, request.body, genericCallback(response))
});

rutasVenta.route("/sales/:id").delete((request, response) => {
    deleteSale(request.params.id, genericCallback(response))
});



rutasVenta.route("/sales/:id").get((request, response) => {
  console.log("Alguien hizo una petición en la ruta /ventas");
  querySale(request.params.id, genericCallback(response));
});
export default rutasVenta;
