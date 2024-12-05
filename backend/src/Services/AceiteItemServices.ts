import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AceiteItem } from "../entities/AceiteItem";
import { Usuario } from "../entities/Usuario";
import { TermoDeUso } from "../entities/TermoDeUso";

class AceiteItensServices {
    private aceiteItensRepository: Repository<AceiteItem>;

    constructor() {
        this.aceiteItensRepository = AppDataSource.getRepository(AceiteItem);
    }

    public async listarAceitesAtivosPorUsuarioETermo(usuario: Usuario, termo: TermoDeUso): Promise<AceiteItem[]> {

        const aceites = await this.aceiteItensRepository.find({
            where: {
                usuario: { id_usuario: usuario.id_usuario },
                termo: { id: termo.id },
                ativo: true
            },
            relations: ["usuario", "termo", "item"]
        });
        return aceites;
    }

}

export default new AceiteItensServices()