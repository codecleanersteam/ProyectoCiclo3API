import Express from "express";
import { queryAllUsers, addUser, modifyUser, deleteUser, queryUser } from "../../controllers/usuarios/controlador.js";

const rutasUsuario = Express.Router();

const genericCallback = (response) => (err, result) => {
  if (err) {
    response.status(500).send("Error de comunicación con la base de datos");
  } else {
    response.json(result);
  }
};  



rutasUsuario.route("/users").get((request, response) => {
    console.log("Alguien hizo una petición en la ruta /usuarios");
    queryAllUsers(genericCallback(response));
});

rutasUsuario.route("/users").post((request, response) => {
    addUser(request.body, genericCallback(response))
});

rutasUsuario.route("/users/:id").patch((request, response) => {
    modifyUser(request.params.id, request.body, genericCallback(response))
});

rutasUsuario.route("/users/:id").delete((request, response) => {
    deleteUser(request.params.id, genericCallback(response))
});



rutasUsuario.route("/users/:id").get((request, response) => {
  console.log("Alguien hizo una petición en la ruta /usuarios");
  queryUser(request.params.id, genericCallback(response));
});
export default rutasUsuario;
