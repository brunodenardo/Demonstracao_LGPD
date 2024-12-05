import Router from "express";
import UserController from "../Controller/UserController";
import TokenServices from "../Services/TokenServices";
import UsuarioServices from "../Services/UsuarioServices";

const UserRouter = Router()

UserRouter.post("/login", UserController.login)
UserRouter.post("/cadastrar", UserController.cadastrarUsuario)
UserRouter.get("/listarDados", TokenServices.autenticarJWT, UserController.listaUsuarioUnico)
UserRouter.get("/listaTodos", TokenServices.autenticarJWT, TokenServices.autenticarPapelAdm, UserController.listartodosUsuarios)
UserRouter.put("/atualiza", TokenServices.autenticarJWT, UserController.atualizacaoUsuario)
UserRouter.put("/desativa", TokenServices.autenticarJWT, UserController.desativarUsuario)
UserRouter.put("/ativa", TokenServices.autenticarJWT, UserController.ativaUsuario)
UserRouter.delete("/esquece", TokenServices.autenticarJWT, UserController.esquecerUsuario)
UserRouter.get("/conferirTermo", TokenServices.autenticarJWT, UserController.conferirTermos)
UserRouter.post("/aceitarTermo", TokenServices.autenticarJWT, UserController.aceitarTermos)
UserRouter.get("/escolhasTermo", TokenServices.autenticarJWT, UserController.listarEscolhasTermo)

export default UserRouter