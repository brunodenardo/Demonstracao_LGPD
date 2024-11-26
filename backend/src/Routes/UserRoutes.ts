import Router from "express";
import UserController from "../Controller/UserController";
import TokenServices from "../Services/TokenServices";

const UserRouter = Router()

UserRouter.get("/listaUsuarios", TokenServices.autenticarJWT, UserController.listartodosUsuarios)
UserRouter.post("/login", UserController.login)
UserRouter.post("/cadastrar", UserController.cadastrarUsuario)

export default UserRouter