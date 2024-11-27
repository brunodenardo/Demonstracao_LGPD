import { DataSource, Repository } from "typeorm";
import { TermosUso } from "../entities/TemosUso";
import { UsuarioTermosUso } from "../entities/UsuarioTermosUso";
import TermosServices from "./TermosServices";
import UsuarioServices from "./UsuarioServices";
import { AppDataSource } from "../data-source";
import TermosLidosDTO from "../DTOs/TermosLidosDTO";

class UsuarioTermosUsoServices {

    private usuarioTermosUsoRepository:Repository<UsuarioTermosUso>

    constructor(){
        this.usuarioTermosUsoRepository = AppDataSource.getRepository(UsuarioTermosUso)
    }

    
    public async adicionarTermosLidos(termosLidosParciais:TermosLidosDTO[], idUsuario:number){
        const usuario = await UsuarioServices.buscarUsuarioPorId(idUsuario)
        if(!usuario){
            throw new Error("Usuario não encontrado")
        }
        const termosAtivos = await TermosServices.buscarTermosAtivos()
        var termosLidos:UsuarioTermosUso[] = termosLidosParciais.map((termoParcial)=>{
            const termo:TermosUso | undefined = termosAtivos.find(termoAtivo => termoAtivo.id == termoParcial.idTermo)
            if(!termo)
                throw new Error("Servidor não conseguiu relacionar o termo enviado com um termo guardado no banco de dados")
            const termoLido = {
                aceito:termoParcial.aceito,
                usuario:usuario,
                termosUso:termo
            } as UsuarioTermosUso
            return termoLido
        })
        await this.usuarioTermosUsoRepository.save(termosLidos)
    }

}

export default new UsuarioTermosUsoServices()