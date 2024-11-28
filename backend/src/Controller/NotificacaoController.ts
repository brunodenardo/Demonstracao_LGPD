import { Request, Response } from 'express';
import UsuarioServices from '../Services/UsuarioServices';
import NotificacaoServices from '../Services/NotificacaoServices';

class NotificacaoController {

    async enviarNotificacao(req:Request, res:Response) {
        try {
            await NotificacaoServices.enviarNotificacoes();
            res.status(200).send({ message: 'Notificações enviadas.' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Erro ao enviar notificações.', error: error });
        }
    }
}

export default new NotificacaoController();