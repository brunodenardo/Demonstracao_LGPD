import { Router } from "express";
import TokenServices from "../Services/TokenServices";
import NotificacaoController from "../Controller/NotificacaoController";

const NotificacaoRouter = Router()

NotificacaoRouter.get("/enviarNotificacoes", TokenServices.autenticarJWT, TokenServices.autenticarPapelAdm, NotificacaoController.enviarNotificacao)


export default NotificacaoRouter;