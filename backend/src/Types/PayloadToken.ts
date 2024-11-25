import { TipoUsuario } from "./TipoUsuario";

export default interface Token_Payload{
    id_usuario: number,
    tipo_usuario: TipoUsuario,
    ativo:boolean
}