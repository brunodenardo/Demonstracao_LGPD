import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Item } from "../entities/Item";
import { TermoDeUso } from "../entities/TermoDeUso";

class ItensServices {
    private itensRepository: Repository<Item>;

    constructor() {
        this.itensRepository = AppDataSource.getRepository(Item)
    }

    public async listarItensPorTermo(termo: TermoDeUso): Promise<Item[]> {
        const itens = await this.itensRepository.find({
            where: { termo: { id: termo.id } },
            relations: ["termo"]
        });

        return itens;
    }
}

export default new ItensServices()