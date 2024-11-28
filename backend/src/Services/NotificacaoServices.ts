import sgMail, { MailService } from "@sendgrid/mail";
import UsuarioServices from "./UsuarioServices";

class NotificacaoServices {
    private mailService: MailService;
    private usuarioServices: typeof UsuarioServices;

    constructor() {
        this.mailService = sgMail;
        const apiKey = process.env.SENDGRID_API_KEY;
        if (!apiKey) {
            throw new Error("API Key do SendGrid não fornecida");
        }
        this.mailService.setApiKey(apiKey);
        this.usuarioServices = UsuarioServices;
    }

    public async enviarNotificacoes(): Promise<void> {
        try {
            const listaEmails = await this.usuarioServices.listarEmails();

            const msg = {
                to: listaEmails,
                from: "vdlaranjeiro@gmail.com",
                subject: "[IMPORTANTE] - Vazamento de dados",
                html: 
                `
                    <p>Informamos que recentemente identificamos um vazamento de dados em nosso sistema.</p>
                    <p>Recomendamos que você altere suas senhas e fique atento a qualquer atividade suspeita em suas contas.</p>
                `
            }
            await this.mailService.sendMultiple(msg);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new NotificacaoServices();