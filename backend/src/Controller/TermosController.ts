import { Request, Response } from "express";
import TermosServices from "../Services/TermosServices";
import CadastroTermosDTO from "../DTOs/CadastroTermosDTO";

class TermosController {

    async criarTermo(req: Request, res: Response) {
        const termoDeUso: CadastroTermosDTO = req.body

        try {
            await TermosServices.criarTermoDeUso(termoDeUso)
            res.status(200).send("Termo de uso criado com sucesso")

        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }

        return;
    }

    async listarTermo(req: Request, res: Response) {
        try {
            const termoAtual = await TermosServices.listarTermoAtual()
            res.status(200).send(termoAtual)
            
        } catch (error: any) {
            console.log(error)
            res.status(500).send({ message: error.message })
        }
        return;
    }

    async historicoTermosUsuario(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        try {
            const historico = await TermosServices.obterHistoricoTermosUsuario(id)
            res.status(200).send(historico)
            
        } catch (error: any) {
            console.log(error)
            res.status(500).send({ message: error.message })
        }
    }
}

export default new TermosController()