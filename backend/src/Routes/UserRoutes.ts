import Router from "express";
import UserController from "../Controller/UserController";
import TokenServices from "../Services/TokenServices";

const UserRouter = Router()

UserRouter.post("/login", UserController.login)
UserRouter.get("/lista/:id", TokenServices.autenticarJWT, UserController.listaUsuarioUnico)
UserRouter.get("/lista/todos", TokenServices.autenticarJWT, UserController.listartodosUsuarios)
UserRouter.put("/atualiza", TokenServices.autenticarJWT, UserController.atualizacaoUsuario)
UserRouter.put("/desativa", TokenServices.autenticarJWT, UserController.desativarUsuario)
UserRouter.put("/ativa", TokenServices.autenticarJWT, UserController.desativarUsuario)
UserRouter.delete("/esquece", TokenServices.autenticarJWT, UserController.esquecerUsuario)

export default UserRouter