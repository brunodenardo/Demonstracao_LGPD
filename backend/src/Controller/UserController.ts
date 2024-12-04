import { Request, Response } from "express";
import UsuarioServices from "../Services/UsuarioServices";
import bcrypt from "bcrypt"
import { Usuario } from "../entities/Usuario";
import AtualizacaoUsuarioDTO from "../DTOs/AtualizacaoUsuarioDTO";
import { TipoUsuario } from "../Types/TipoUsuario";
import TermosLidosDTO from "../DTOs/TermosLidosDTO";
import UsuarioTermosUsoSevices from "../Services/UsuarioTermosUsoSevices";

class UserController{

    async login(req:Request, res:Response){
        const {senha, email} = req.body
        try{
            const result = await UsuarioServices.login(senha, email)
            console.log(result)
            if(result){
                res.send(result)
                return;
            }
            res.status(400).send("Usuário não encontrado")
        } catch(error){
            res.status(500).send({menssage:"Servidor não conseguiu completar o processo", erro:error})
        }
        return;
    }

    async adicionarTermosLidos(req:Request, res:Response){
        const termosLidos:TermosLidosDTO[] = req.body.termosLidos as TermosLidosDTO[]
        const idUsuario = res.locals.user.id_usuario
        try{
            await UsuarioTermosUsoSevices.adicionarTermosLidos(termosLidos, idUsuario)
            res.status(200)
        } catch(error){
            res.status(500).send(error)
        }
        return;
    }

    async listartodosUsuarios(req:Request, res:Response){
        try{
            const listaUsuarios = await UsuarioServices.listarUsuarios()
            res.send(listaUsuarios)
        } catch(error){
            res.status(500).send({mensagem: "Servidor não conseguiu completar o processo", erro:error})
        }
        return;
    }

    async listaUsuarioUnico(req:Request, res:Response){
        try{
            const id = res.locals.user.id_usuario
            if(res.locals.user.tipo_usuario == TipoUsuario.adm || !!id){
                const usuario = await UsuarioServices.buscarUsuarioPorId(id)
                res.send(usuario)
            } else{
                res.status(403).send("Ação não permitida")
            }
            
        } catch(error){
            res.status(400).send({mensagem: "Busca não foi realizada", erro:error})
        }
    }

    async cadastrarUsuario(req:Request, res:Response){
        //console.log(req.body)
        var usuario:Partial<Usuario> = req.body as Usuario
        if(usuario.senha == null){
            res.status(400).send("Requisição não possui os dados necessários")
            return;
        }
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
        usuario.ativo = true;
        try{ 
            await UsuarioServices.criarUsuario(usuario)
        }catch(error){
            res.status(500).send({mensagem: "Servidor não conseguiu completar o processo", erro:error})
            return;
        }
        res.status(200).send({})
        return;
    }

    async atualizacaoUsuario(req:Request, res:Response){
        const usuarioDTO: AtualizacaoUsuarioDTO = req.body
        const id = res.locals.user.id_usuario
        var usuario:Partial<Usuario> = usuarioDTO
        if(usuario.senha != null)
            usuario.senha = await bcrypt.hash(usuario.senha, 10)
        try{
            await UsuarioServices.atualizarUsuario(id, usuario)
            res.status(200).send({})
        } catch(error){
            res.status(500).send({mensagem: "Servidor não conseguiu completar o processo", erro:error})
        }
        return;
    }

    async esquecerUsuario(req:Request, res:Response){
        const id = res.locals.user.id_usuario
        try{
            await UsuarioServices.esquecerUsuario(id)
            res.status(200).send({})
        } catch(error){
            console.log(error as Error)
            res.status(500).send({mensagem: "Servidor não conseguiu completar o processo", erro:error})
        }
        return;
    }

    async desativarUsuario(req:Request, res:Response){
        const id = res.locals.user.id_usuario
        const usuario:Partial<Usuario> = {ativo:false}
        try{
            await UsuarioServices.atualizarUsuario(id, usuario)
            res.status(200).send({})
        } catch(error){
            console.log(error)
            res.status(500).send({mensagem: "Servidor não conseguiu completar o processo", erro:error})
        }
        return;
    }

    async ativaUsuario(req:Request, res:Response){
        const id = res.locals.user.id_usuario
        const usuario:Partial<Usuario> = {ativo:true}
        try{
            await UsuarioServices.atualizarUsuario(id, usuario)
            res.status(200).send({})
        } catch(error){
            res.status(500).send({mensagem: "Servidor não conseguiu completar o processo", erro:error})
        }
        return;
    }

    async adicionaTermosLidos(req:Request, res:Response){
        var termosLidosParciais:TermosLidosDTO[] = req.body.termosLidos
        const id = res.locals.id_usuario
        try{
            await UsuarioTermosUsoSevices.adicionarTermosLidos(termosLidosParciais, id)
            res.status(200)
        } catch(error){
            res.status(500).send(error)
        }
        return;
    }

}

export default new UserController()