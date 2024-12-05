import { Router } from "express";
import TokenServices from "../Services/TokenServices";
import TermosController from "../Controller/TermosController";
//import TermosServices from "../Services/TermosServices";

const TermosRouter = Router()

TermosRouter.post("/criar", TokenServices.autenticarJWT, TokenServices.autenticarPapelAdm, TermosController.criarTermo)
TermosRouter.get("/termoAtual", TermosController.listarTermo)
TermosRouter.get("/historicoUsuario/:id", TermosController.historicoTermosUsuario)

export default TermosRouter