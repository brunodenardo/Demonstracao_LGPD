import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcrypt"
import TokenServices from "./TokenServices";
import PayloadToken from "../Types/PayloadToken";
import { TermosUso } from "../entities/TermosUso";
import { UsuarioTermosUso } from "../entities/UsuarioTermosUso";

class UsuarioServices {
    private usuarioRepository: Repository<Usuario>;
    private termosRepository:Repository<TermosUso>;

    constructor() {
        // Inicializa o repositório do TypeORM para a entidade Usuario
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
        this.termosRepository = AppDataSource.getRepository(TermosUso)
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
            select:["id_usuario", "nome_completo", "cep", "data_nascimento", "email", "cpf"]
        });
        return usuario;
    }

    // Buscar um usuário pelo ID
    public async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
        try{ 
            return await this.usuarioRepository.findOne({
                where: { id_usuario: id },
                relations: [
                    "usuarioTermosUso",
                    "usuarioTermosUso.termosUso"
                ],
                select:["id_usuario", "nome_completo", "cep", "data_nascimento", "email", "cpf"]
            })
        } catch(error){
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
        console.log(usuario)
        const payload: PayloadToken = { id_usuario: usuario.id_usuario, tipo_usuario: usuario.tipo, ativo: usuario.ativo }
        const token = TokenServices.gerarToken(payload)
        const termosAindaNaoApresentados = await this.conferirTermos(usuario)

        return {token:token, usuarioAtivo:usuario.ativo, termosAindaNaoApresentados}
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

    public async conferirTermos(usuario:Usuario): Promise<TermosUso[]>{
        const termosAindaNaoApresentados = await this.termosRepository
            .createQueryBuilder("termosUso")
            .innerJoin("termosUso.usuarioTermosUso", "relacaoUsuario") 
            .where("termosUso.ativo = true AND NOT relacaoUsuario.usuario = :idUsuario", { idUsuario: usuario?.id_usuario }) 
            .getMany();
            return termosAindaNaoApresentados
    }

    public async listarEmails(): Promise<string[]> {
        try {
            const usuarios = await this.listarUsuarios();
            const emails = usuarios.map(usuario => usuario.email);
    
            return emails;
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new UsuarioServices();
