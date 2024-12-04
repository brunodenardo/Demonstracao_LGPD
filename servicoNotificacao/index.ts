import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const mailService = sgMail;

const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
    throw new Error("API Key do SendGrid não fornecida");
}

mailService.setApiKey(apiKey);

try {
    const listaEmails: string[] = [] // Substituir por uma lista de emails válida
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
    mailService.sendMultiple(msg);
} catch (error) {
    console.error("Erro ao enviar email", error);
}