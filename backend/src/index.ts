import express from 'express'
import cors from 'cors';
import * as dotenv from "dotenv";
import bodyParser from 'body-parser';

import { AppDataSource } from "./data-source";

import UserRouter from './Routes/UserRoutes';
import TermosRouter from './Routes/TermosRoutes';

import seedUsuarios from "./Services/seedUsuario";

dotenv.config();

const ambiente = process.env.AMBIENTE || "dev"

if (ambiente == "dev") {
    AppDataSource.initialize()
        .then(async () => {
            console.log("Banco de dados conectado!");
            await seedUsuarios(); // Executa a seed de usuários
        })
        .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));
}



const app = express()
app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
}))

app.use("/user", UserRouter)
app.use("/termos", TermosRouter)
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});