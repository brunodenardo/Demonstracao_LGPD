import { Request, Response } from "express";
import UsuarioServices from "../Services/UsuarioServices";

import bcrypt from "bcrypt"
import { Usuario } from "../entities/Usuario";
import AtualizacaoUsuarioDTO from "../DTOs/AtualizacaoUsuarioDTO";
import { TipoUsuario } from "../Types/TipoUsuario";
import { AceiteTermoDTO } from "../DTOs/AceiteTermoDTO";

class UserController {

    async login(req: Request, res: Response) {
        const { senha, email } = req.body
        try {
            const result = await UsuarioServices.login(senha, email)
            // console.log(result)
            if (result) {
                res.send(result)
                return;
            }
            res.status(400).send("Usuário não encontrado")
        } catch (error: any) {
            res.status(500).send({ message: "Servidor não conseguiu completar o processo", erro: error.message })
        }
        return;
    }

    async listartodosUsuarios(req: Request, res: Response) {
        try {
            const listaUsuarios = await UsuarioServices.listarUsuarios()
            res.send(listaUsuarios)
        } catch (error) {
            res.status(500).send({ mensagem: "Servidor não conseguiu completar o processo", erro: error })
        }
        return;
    }

    async listaUsuarioUnico(req: Request, res: Response) {
        try {
            const id = res.locals.user.id_usuario
            if (res.locals.user.tipo_usuario == TipoUsuario.adm || !!id) {
                const user = await UsuarioServices.buscarUsuarioPorId(id)
                if (!user) {
                    res.status(400).send("Usuário não encontrado")
                    return;
                }

                res.status(200).send(user)
            } else {
                res.status(403).send("Ação não permitida")
            }

        } catch (error: any) {
            res.status(400).send({ mensagem: "Busca não foi realizada", erro: error.message })
        }
    }

    async cadastrarUsuario(req: Request, res: Response) {
        const usuario: Partial<Usuario> = req.body.usuario
        const termo: AceiteTermoDTO = req.body.termo

        if (usuario.senha == null) {
            res.status(400).send("Requisição não possui os dados necessários")
            return;
        }
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
        usuario.ativo = true;
        try {
            const usuarioCadastrado = await UsuarioServices.criarUsuario(usuario)
            await UsuarioServices.registrarAceiteTermos(usuarioCadastrado, termo)
            res.status(200).send({})

        } catch (error: any) {
            res.status(500).send({ mensagem: "Servidor não conseguiu completar o processo", erro: error.message })
        }
        return;
    }

    async atualizacaoUsuario(req: Request, res: Response) {
        const usuarioDTO: AtualizacaoUsuarioDTO = req.body;

        const id = res.locals.user.id_usuario;
        const usuario: Partial<Usuario> = usuarioDTO;

        if (usuario.senha != null && usuario.senha != "") {
            usuario.senha = await bcrypt.hash(usuario.senha, 10);
        }

        try {
            await UsuarioServices.atualizarUsuario(id, usuario);
            res.status(200).send({});
        } catch (error) {
            res.status(500).send({ mensagem: "Servidor não conseguiu completar o processo", erro: error });
        }
        return;
    }

    async esquecerUsuario(req: Request, res: Response) {
        const id = res.locals.user.id_usuario
        try {
            await UsuarioServices.esquecerUsuario(id)
            res.status(200).send({})
        } catch (error) {
            res.status(500).send({ mensagem: "Servidor não conseguiu completar o processo", erro: error })
        }
        return;
    }

    async desativarUsuario(req: Request, res: Response) {
        const id = res.locals.user.id_usuario
        const usuario: Partial<Usuario> = { ativo: false }
        try {
            await UsuarioServices.atualizarUsuario(id, usuario)
            res.status(200).send({})
        } catch (error) {
            res.status(500).send({ mensagem: "Servidor não conseguiu completar o processo", erro: error })
        }
        return;
    }

    async ativaUsuario(req: Request, res: Response) {
        const id = res.locals.user.id_usuario
        const usuario: Partial<Usuario> = { ativo: true }
        try {
            await UsuarioServices.atualizarUsuario(id, usuario)
            res.status(200).send({})
        } catch (error) {
            res.status(500).send({ mensagem: "Servidor não conseguiu completar o processo", erro: error })
        }
        return;
    }

    async conferirTermos(req: Request, res: Response) {
        const id = res.locals.user.id_usuario
        try {
            const termoEntregue = await UsuarioServices.conferirTermos(id)
            res.status(200).send(termoEntregue)
        } catch (error: any) {
            res.status(500).send({ mensagem: "Servidor não conseguiu completar o processo", erro: error.message })
        }
    }

    async aceitarTermos(req: Request, res: Response) {
        const termo: AceiteTermoDTO = req.body
        const usuario = res.locals.user

        try {
            await UsuarioServices.registrarAceiteTermos(usuario, termo)
            res.status(200).send({})

        } catch (error: any) {
            res.status(500).send({ mensagem: "Servidor não conseguiu completar o processo", erro: error.message })
        }
    }

    async atualizarTermos(req: Request, res: Response) {
        const termo: AceiteTermoDTO = req.body
        const usuario = res.locals.user

        try {
            await UsuarioServices.registrarAceiteTermos(usuario, termo)
            res.status(200).send({})

        } catch (error: any) {
            res.status(500).send({ mensagem: "Servidor não conseguiu completar o processo", erro: error.message })
        }
    }

    async listarEscolhasTermo(req: Request, res: Response) {
        const usuario: Usuario = res.locals.user

        try {
            const termo = await UsuarioServices.listarEscolhasTermo(usuario)
            res.status(200).send(termo)
        } catch (error: any) {
            res.status(500).send({ mensagem: "Servidor não conseguiu completar o processo", erro: error.message })
        }
    }
}

export default new UserController()