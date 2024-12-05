import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcrypt"
import TokenServices from "./TokenServices";
import TermosServices from "./TermosServices";
import PayloadToken from "../Types/PayloadToken";
import * as fs from 'fs';
import * as appRoot from 'app-root-path';
import * as path from 'path';
import { AceiteItem } from "../entities/AceiteItem";
import { TermoDeUso } from "../entities/TermoDeUso";
import { AceiteTermoDTO } from "../DTOs/AceiteTermoDTO";
import { Item } from "../entities/Item";
import ItensServices from "./ItensServices";
import AceiteItemServices from "./AceiteItemServices";

class UsuarioServices {
    private usuarioRepository: Repository<Usuario>;
    private termosRepository: Repository<TermoDeUso>;
    private interacaoRepository: Repository<AceiteItem>;

    constructor() {
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
        this.termosRepository = AppDataSource.getRepository(TermoDeUso);
        this.interacaoRepository = AppDataSource.getRepository(AceiteItem);
    }

    // Criar um novo usuário
    public async criarUsuario(data: Partial<Usuario>): Promise<Usuario> {
        const usuario = this.usuarioRepository.create(data); // Cria a instância
        return await this.usuarioRepository.save(usuario); // Salva no banco
    }

    // Listar todos os usuários
    public async listarUsuarios(): Promise<Usuario[]> {
        const usuario = await this.usuarioRepository.find({
            where: { ativo: true },
            select: ["id_usuario", "nome_completo", "cep", "data_nascimento", "email", "cpf"]
        });
        return usuario;
    }

    // Buscar um usuário pelo ID
    public async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
        try {
            return await this.usuarioRepository.findOne({
                where: { id_usuario: id },
                relations: ["aceites"],
                select: ["id_usuario", "nome_completo", "cep", "data_nascimento", "email", "cpf"]
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public async login(senha: string, email: string) {
        const usuario = await this.usuarioRepository.findOne({ where: { email: email } });
        if (!usuario) {
            return false;
        }
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return false;
        }
        // console.log(usuario)
        const payload: PayloadToken = { id_usuario: usuario.id_usuario, tipo_usuario: usuario.tipo, ativo: usuario.ativo }
        const token = TokenServices.gerarToken(payload)
        return { token: token, usuarioAtivo: usuario.ativo }
    }

    public async atualizarUsuario(id: number, data: Partial<Usuario>): Promise<Usuario | null> {
        const usuario = await this.buscarUsuarioPorId(id);
        if (!usuario) {
            return null;
        }

        if (data.senha === '') {
            delete data.senha;
        }

        Object.assign(usuario, data);
        return await this.usuarioRepository.save(usuario);
    }

    public async excluirLogicamenteUsuario(id: number): Promise<boolean> {
        const usuario = await this.buscarUsuarioPorId(id);
        if (!usuario) {
            return false;
        }
        usuario.ativo = false
        await this.usuarioRepository.save(usuario);
        return true;
    }

    private readonly blacklistPath = path.join(appRoot.path, 'backups/blacklist.json');

    public async esquecerUsuario(id: number): Promise<boolean> {
        console.log(this.blacklistPath)
        const usuario = await this.buscarUsuarioPorId(id);
        if (!usuario) {
            return false;
        }

        const data = fs.existsSync(this.blacklistPath)
            ? JSON.parse(fs.readFileSync(this.blacklistPath, 'utf-8'))
            : { blacklist: [] };

        // Verificar se o ID já está na blacklist
        if (!data.blacklist.includes(id)) {
            data.blacklist.push(id);

            // Salvar o arquivo JSON atualizado
            fs.writeFileSync(this.blacklistPath, JSON.stringify(data, null, 2), 'utf-8');
            console.log(`ID ${id} adicionado à blacklist.`);
        } else {
            console.log(`ID ${id} já está na blacklist.`);
        }
        await this.usuarioRepository.remove(usuario);
        return true;
    }

    public async conferirTermos(id_usuario: number): Promise<boolean> {
        const termoAtual = await TermosServices.listarTermoAtual();

        const termoEntregue = await this.interacaoRepository.findOne({
            where: {
                usuario: { id_usuario: id_usuario },
                termo: { id: termoAtual.id }
            }
        });
        console.log(!!termoEntregue)

        return !!termoEntregue;
    }

    public async registrarAceiteTermos(usuario: Usuario, termoAceito: AceiteTermoDTO) {

        // Verificação do termo
        const termo = await this.termosRepository.findOne({
            where: { id: termoAceito.id },
            relations: ["itens"],
        });

        if (!termo) {
            throw new Error("Termo de uso não encontrado.");
        }

        // Verificação dos itens do termo
        const idsItensValidos = termo.itens.map(item => item.id);
        const itensInvalidos = termoAceito.itens.filter(
            item => !idsItensValidos.includes(item.id)
        );

        if (itensInvalidos.length > 0) {
            throw new Error("Um ou mais itens não pertencem ao termo de uso fornecido.");
        }

        // Marcar as escolhas anteriores como inativas
        for (const item of termoAceito.itens) {
            await this.interacaoRepository.update(
                { usuario: usuario, termo: termo, item: { id: item.id } as Item },
                { ativo: false }
            );
        }

        // Registrar aceite dos itens
        const registrosAceite: Partial<AceiteItem>[] = termoAceito.itens.map((item) => ({
            usuario: usuario,
            termo: termo,
            item: { id: item.id } as Item,
            aceito: item.aceito,
        }))
        await this.interacaoRepository.save(registrosAceite);
    }

    public async listarEscolhasTermo(usuario: Usuario) {

        const termoAtual = await TermosServices.listarTermoAtual();

        // Recuperar os itens e os aceites
        const itens = await ItensServices.listarItensPorTermo(termoAtual);
        const aceites = await AceiteItemServices.listarAceitesAtivosPorUsuarioETermo(usuario, termoAtual);

        // Combinar as informações dos itens com os aceites correspondentes
        const itensComAceites = itens.map(item => {
            const aceite = aceites.find(a => a.item.id === item.id);
            return {
                ...item,
                aceito: aceite?.aceito
            };
        });

        return ({
            id: termoAtual.id,
            itens: itensComAceites
        })
    }
}


export default new UsuarioServices();
