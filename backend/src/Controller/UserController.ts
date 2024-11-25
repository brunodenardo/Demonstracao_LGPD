import { Request, Response } from "express";
import UsuarioServices from "../Services/UsuarioServices";
import bcrypt from "bcrypt"
import { Usuario } from "../entities/Usuario";
import AtualizacaoUsuarioDTO from "../DTOs/AtualizacaoUsuarioDTO";

class UserController{

    async login(req:Request, res:Response){
        const {senha, email} = req.body
        try{
            const result = await UsuarioServices.login(senha, email)
            if(result){
                res.send({token:result})
                return;
            }
            res.status(400).send("Usuário não encontrado")
        } catch(error){
            res.status(500).send()
        }
        return;
    }

    async listartodosUsuarios(req:Request, res:Response){
        console.log(res.locals.user)
        const tipoUsuario = res.locals.user.tipo_usuario
        if(tipoUsuario != "ADMINISTRADOR"){
            res.status(403).send("Ação não permitida")
            return;
        }
        try{
            const listaUsuarios = await UsuarioServices.listarUsuarios()
            res.send(listaUsuarios)
        } catch(error){
            res.status(500).send({mensagem: "Servidor não conseguiu completar o processo", erro:error})
        }
        return;
    }

    async cadastrarUsuario(req:Request, res:Response){
        var usuario:Partial<Usuario> = req.body.usuario
        if(usuario.senha == null){
            res.status(400).send("Requisição não possui os dados necessários")
            return;
        }
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
        try{ 
            await UsuarioServices.criarUsuario(usuario)
        }catch(error){
            res.status(500).send({mensagem: "Servidor não conseguiu completar o processo", erro:error})
            return;
        }
        res.status(200)
        return;
    }

    async atualizacaoUsuario(req:Request, res:Response){
        const usuarioDTO: AtualizacaoUsuarioDTO = req.body
        const id = res.locals.usuario.id_usuario
        var usuario:Partial<Usuario> = usuarioDTO
        if(usuario.senha != null)
            usuario.senha = await bcrypt.hash(usuario.senha, 10)
        try{
            await UsuarioServices.atualizarUsuario(id, usuario)
            res.status(200)
        } catch(error){
            res.status(500).send({mensagem: "Servidor não conseguiu completar o processo", erro:error})
        }
        return;
    }

    async esquecerUsuario(req:Request, res:Response){
        const id = res.locals.usuario.id_usuario
        try{
            await UsuarioServices.esquecerUsuario(id)
            res.status(200)
        } catch(error){
            res.status(500).send({mensagem: "Servidor não conseguiu completar o processo", erro:error})
        }
        return;
    }

}

export default new UserController()