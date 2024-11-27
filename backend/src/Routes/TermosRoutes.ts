import { Router } from "express";
import TokenServices from "../Services/TokenServices";
import TermosController from "../Controller/TermosController";
import TermosServices from "../Services/TermosServices";

const TermosRouter = Router()

TermosRouter.post("/criar", TokenServices.autenticarJWT, TokenServices.autenticarPapelAdm, TermosController.criarTermo)
TermosRouter.get("/ativos", TokenServices.autenticarJWT, TokenServices.autenticarPapelAdm, TermosController.buscarTermosAtivos)
TermosRouter.get("/:id", TokenServices.autenticarJWT, TokenServices.autenticarPapelAdm, TermosController.buscarTermosPorID)
TermosRouter.delete("/:id", TokenServices.autenticarJWT, TokenServices.autenticarPapelAdm, TermosController.desativarTermo)
TermosRouter.get("/historico/completo", TokenServices.autenticarJWT, TokenServices.autenticarPapelAdm, TermosController.historicoCompleto)
TermosRouter.get("/historico/periodo/:dataInicio/:dataFinal", TokenServices.autenticarJWT, TokenServices.autenticarPapelAdm, TermosController.historicoPeriodo)
TermosRouter.get("/historico/ativo/:dia", TokenServices.autenticarJWT, TokenServices.autenticarPapelAdm, TermosController.historicoTermosAtivosNoDia)

export default TermosRouter