import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TermosUso } from "../entities/TemosUso";

class TermosServices{
    private termosRepository:Repository<TermosUso>;

    constructor(){
        this.termosRepository = AppDataSource.getRepository(TermosUso)
    }

    public async criarTermo(data: Partial<TermosUso>):Promise<TermosUso>{
        const termos =  await this.termosRepository.create(data)
        return await this.termosRepository.save(termos)
    }

    public async buscarTermoPorId(idTermo:number):Promise<TermosUso>{
        const termo = await this.termosRepository.findOne({where:{id:idTermo}})
        if(termo){
            return termo
        }
        throw("Termo não encontrado")
    }

    public async desativarTermo(idTermo:number):Promise<void>{
        const termo = await this.buscarTermoPorId(idTermo)
        termo.ativo = false
        await this.termosRepository.save(termo)
    }

}

export default new TermosServices()