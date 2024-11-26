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
}