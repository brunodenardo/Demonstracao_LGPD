import Router from "express";
import UserController from "../Controller/UserController";
import TokenServices from "../Services/TokenServices";
import UsuarioServices from "../Services/UsuarioServices";

const UserRouter = Router()

UserRouter.post("/login", UserController.login)
UserRouter.post("/cadastrar", UserController.cadastrarUsuario)
UserRouter.get("/lista/:id", TokenServices.autenticarJWT, UserController.listaUsuarioUnico)
UserRouter.get("/listaTodos", TokenServices.autenticarJWT, TokenServices.autenticarPapelAdm, UserController.listartodosUsuarios)
UserRouter.put("/adiciona/termos", TokenServices.autenticarJWT, UserController.adicionarTermosLidos)
UserRouter.put("/atualiza", TokenServices.autenticarJWT, UserController.atualizacaoUsuario)
UserRouter.put("/desativa", TokenServices.autenticarJWT, UserController.desativarUsuario)
UserRouter.put("/ativa", TokenServices.autenticarJWT, UserController.desativarUsuario)
UserRouter.delete("/esquece", TokenServices.autenticarJWT, UserController.esquecerUsuario)

export default UserRouter