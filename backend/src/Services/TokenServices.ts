import jwt from "jsonwebtoken";
import PayloadToken from "../Types/PayloadToken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_token"



class TokenServices {

    public gerarToken(payload: PayloadToken): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    }

    public autenticarJWT(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers.authorization?.split(" ")[1]; // Token no cabeçalho `Authorization: Bearer <token>`
        console.log(token)
        if (!token) {
            res.status(401).json({ message: "Token não fornecido!" });
            return; // Adicione `return` para garantir que o método retorne void
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as PayloadToken;
            res.locals.user = decoded; // Salva os dados no `res.locals`
            next(); // Continua para o próximo middleware ou handler de rota
        } catch (error) {
            res.status(403).json({ message: "Token inválido!" });
            return; // Adicione `return` aqui também
        }
    }

}

export default new TokenServices()