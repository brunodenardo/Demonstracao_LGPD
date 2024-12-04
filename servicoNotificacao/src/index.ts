import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import BuscaEmails from "./service/BuscaEmails";

dotenv.config();



const mailService = sgMail;



/* const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
    throw new Error("API Key do SendGrid não fornecida");
}

mailService.setApiKey(apiKey);
 */


AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
    enviaEmail()
    // Insira a lógica do seu projeto aqui
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
  });


async function enviaEmail() {
    try {
        const listaEmails: string[] = await BuscaEmails.buscar(); // Substituir por uma lista de emails válida
        console.log(listaEmails)
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
    
}


