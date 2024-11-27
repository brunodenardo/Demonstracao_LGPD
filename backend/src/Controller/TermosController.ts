import { Request, Response } from "express";
import { TermosUso } from "../entities/TemosUso";
import TermosServices from "../Services/TermosServices";

class TermosController{

    async criarTermo(req:Request, res:Response){
        const termosUso:Partial<TermosUso> = req.body
        termosUso.data_criacao = new Date()
        try{
            await TermosServices.criarTermo(termosUso)
            res.status(200)
        } catch(error){
            res.status(400).send(error)
        }
        return;
    }

    async buscarTermosAtivos(req:Request, res:Response){
        try{
            const termosAtivos = await TermosServices.buscarTermosAtivos()
            res.send(termosAtivos)
        } catch(error){
            console.log(error)
            res.status(500).send(error)
        }
        return;
    }

    async buscarTermosPorID(req:Request, res:Response){
        const id = parseInt(req.params.id)
        try{
            const termo = await TermosServices.buscarTermoPorId(id)
            if(termo)
                res.send(termo)
            else
                res.status(400).send("Termo não encontrado")
        } catch(error){
            console.log(error)
            res.status(500).send(error)
        }
        return;
    }

    async desativarTermo(req:Request, res:Response){
        const id = parseInt(req.params.id)
        try{
            const termos = await TermosServices.desativarTermo(id)
            if(termos)
                res.status(200)
            else
                res.status(400).send("Termo não encontrado")
        } catch(error){
            console.log(error)
            res.status(500).send(error)
        }
        return;
    }

    async historicoCompleto(req:Request, res:Response){
        try{
            const historico = await TermosServices.historicoTermosCompleto()
            res.send(historico)
        } catch(error){
            console.log(error)
            res.status(500).send(error)
        }
        return;
    }

    async historicoPeriodo(req:Request, res:Response){
        const dataInicio:Date = new Date(req.params.dataInicio)
        const dataFinal:Date = new Date(req.params.dataFinal) 
        try{
            const historicoPeriodo:TermosUso[] = await TermosServices.historicoPeriodo(dataInicio, dataFinal)
            res.send(historicoPeriodo)
        } catch(error){
            res.status(500).send(error)
        }
        return;
    }

    async historicoTermosAtivosNoDia(req:Request, res:Response){
        const diaPesquisado = new Date(req.params.dia)
        try{
            const historicoDia = await TermosServices.historicoTermosAtivosNoDia(diaPesquisado)
            res.send(historicoDia)
        } catch(error){
            console.log(error)
            res.status(500).send(error)
        }
        return;
    }
}

export default new TermosController()