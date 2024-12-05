import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TermoDeUso } from "../entities/TermoDeUso";
import CadastroTermosDTO from "../DTOs/CadastroTermosDTO";
import { Item } from "../entities/Item";
import { AceiteItem } from "../entities/AceiteItem";

class TermosServices {
    private termosRepository: Repository<TermoDeUso>;
    private itensRepository: Repository<Item>;
    private interacaoRepository: Repository<AceiteItem>;

    constructor() {
        this.termosRepository = AppDataSource.getRepository(TermoDeUso)
        this.itensRepository = AppDataSource.getRepository(Item)
        this.interacaoRepository = AppDataSource.getRepository(AceiteItem)
    }

    public async criarTermoDeUso(data: CadastroTermosDTO): Promise<void> {
        this.validarDadosCadastro(data);

        const termo = this.termosRepository.create({
            versao: data.versao,
        })
        await this.termosRepository.save(termo)

        const itens = data.itens.map(item => {
            return this.itensRepository.create({
                termo: termo,
                descricao: item.descricao,
                obrigatorio: item.obrigatorio
            })
        })
        await this.itensRepository.save(itens)

        return;
    }

    public async listarTermoAtual(): Promise<TermoDeUso> {
        const termoAtual = await this.termosRepository.findOne({
            where: {},
            order: { data_criacao: "DESC" },
            relations: ["itens"],
        });

        if (!termoAtual) {
            throw new Error("Nenhum termo de uso encontrado.")
        }

        return termoAtual;
    }

    async obterHistoricoTermosUsuario(usuarioId: number) {
        const historico = await this.interacaoRepository.find({
            where: { usuario: { id_usuario: usuarioId } },
            order: { dataInteracao: "DESC" },
            relations: ["termo", "usuario", "item"],
        });

        if (!historico || historico.length === 0) {
            return 'Sem histórico de termos aceitos para o usuário.';
        }

        const resposta = {
            usuario: {
                id: historico[0].usuario.id_usuario,
                nome_completo: historico[0].usuario.nome_completo,
                cpf: historico[0].usuario.cpf,
                email: historico[0].usuario.email,
            },
            historico: historico.map(interacao => ({
                id: interacao.id,
                dataInteracao: interacao.dataInteracao,
                versao_termo: interacao.termo.versao,
                descricao_item: interacao.item.descricao,
                obrigatoriedade_item: interacao.item.obrigatorio,
                aceito: interacao.aceito,
            })),
        };

        return resposta;
    }

    private validarDadosCadastro(data: CadastroTermosDTO): void {
        if (data.itens.length === 0) {
            throw new Error("Termo de uso deve conter ao menos um item");
        }

        if (!data.versao) {
            throw new Error("Termo de uso deve conter uma versão");
        }

        const peloMenosUmItemObrigatorio = data.itens.some(item => item.obrigatorio);
        if (!peloMenosUmItemObrigatorio) {
            throw new Error("Termo de uso deve conter ao menos um item obrigatório");
        }
    }

}

export default new TermosServices()