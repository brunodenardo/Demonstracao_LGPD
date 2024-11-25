import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcrypt"
import TokenServices from "./TokenServices";
import PayloadToken from "../Types/PayloadToken";

class UsuarioServices {
    private usuarioRepository: Repository<Usuario>;

    constructor() {
        // Inicializa o repositório do TypeORM para a entidade Usuario
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
    }

    // Criar um novo usuário
    public async criarUsuario(data: Partial<Usuario>): Promise<Usuario> {
        const usuario = this.usuarioRepository.create(data); // Cria a instância
        return await this.usuarioRepository.save(usuario); // Salva no banco
    }

    // Listar todos os usuários
    public async listarUsuarios(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({ where: { ativo: true }, relations: ["termos_uso"] }); // Inclui o relacionamento
    }

    // Buscar um usuário pelo ID
    public async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: { id_usuario: id },
            relations: ["termos_uso"],
        });
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
        const payload: PayloadToken = { id_usuario: usuario.id_usuario, tipo_usuario: usuario.tipo, ativo: usuario.ativo }
        const token = TokenServices.gerarToken(payload)
        return token
    }

    public async atualizarUsuario(id: number, data: Partial<Usuario>): Promise<Usuario | null> {
        const usuario = await this.buscarUsuarioPorId(id);
        if (!usuario) {
            return null;
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

    public async esquecerUsuario(id: number): Promise<boolean> {
        const usuario = await this.buscarUsuarioPorId(id);
        if (!usuario) {
            return false;
        }

        await this.usuarioRepository.remove(usuario);
        return true;
    }
}

export default new UsuarioServices();
