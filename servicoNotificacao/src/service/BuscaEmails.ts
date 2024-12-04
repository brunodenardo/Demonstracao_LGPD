import { Repository } from "typeorm";
import { Usuario } from "../entities/Usuario";
import { AppDataSource } from "../data-source";

class BuscaEmails{
    private usuarioRepo:Repository<Usuario>;

    constructor(){
        this.usuarioRepo = AppDataSource.getRepository(Usuario);
    }

    public async buscar():Promise<string[]>{
        const usaurios:Usuario[] = await this.usuarioRepo.find({select:["email"]});
        console.log(usaurios)
        if (usaurios.length == 0)
            throw new Error("Não foi encontrado nenhum email cadastrado")
        return usaurios.map(usaurios => usaurios.email)
    }
}

export default new BuscaEmails()