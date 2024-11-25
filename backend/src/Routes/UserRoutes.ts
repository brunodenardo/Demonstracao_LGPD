import Router from "express";
import UserController from "../Controller/UserController";
import TokenServices from "../Services/TokenServices";

const UserRouter = Router()

UserRouter.get("/listaUsuarios", TokenServices.autenticarJWT, UserController.listartodosUsuarios)
UserRouter.post("/login", UserController.login)

export default UserRouter