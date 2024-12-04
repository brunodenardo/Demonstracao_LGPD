import { Between, IsNull, LessThan, MoreThan, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TermosUso } from "../entities/TermosUso";

class TermosServices{
    private termosRepository:Repository<TermosUso>;

    constructor(){
        this.termosRepository = AppDataSource.getRepository(TermosUso)
    }

    public async criarTermo(data: Partial<TermosUso>):Promise<TermosUso>{
        const termos =  await this.termosRepository.create(data)
        return await this.termosRepository.save(termos)
    }

    public async buscarTermosAtivos():Promise<TermosUso[]>{
        return await this.termosRepository.find({where:{ativo:true}})
    }

    public async buscarTermoPorId(idTermo:number):Promise<TermosUso>{
        const termo = await this.termosRepository.findOne({where:{id:idTermo}})
        if(termo){
            return termo
        }
        throw("Termo não encontrado")
    }

    public async desativarTermo(idTermo:number):Promise<TermosUso>{
        const termo = await this.buscarTermoPorId(idTermo)
        termo.ativo = false
        return await this.termosRepository.save(termo)
    }

    public async historicoTermosCompleto():Promise<TermosUso[]>{
        return await this.termosRepository.find()
    }

    public async historicoPeriodo(dataInicio:Date, dataFinal:Date):Promise<TermosUso[]>{
        return await this.termosRepository.find({
            where:{
                data_criacao:Between(dataInicio, dataFinal)
            }
        })
    }

    public async historicoTermosAtivosNoDia(dataPesquisada:Date){
        return await this.termosRepository.find({
            where: [
                {
                    data_criacao: LessThan(dataPesquisada),
                    data_desativacao: MoreThan(dataPesquisada),
                },
                {
                    data_criacao: LessThan(dataPesquisada),
                    data_desativacao: IsNull()
                }
            ]
        })
    }

}

export default new TermosServices()