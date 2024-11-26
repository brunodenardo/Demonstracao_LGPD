'use client';

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useState } from "react";
import { login } from "../api/auth";

export default function LoginForm() {
    const [usuario, setUsuario] = useState({
        senha: "",
        email: "",
    });

    function handleChange(e: any) {
        const { name, value } = e.target;
        setUsuario(usuario => ({
            ...usuario,
            [name]: value
        }));
    }

    async function handleRegister(e: any) {
        e.preventDefault();
        await login(usuario);
    }

    return (
        <div className="bg-white p-10 rounded">
            <h1 className="text-lg font-semibold mb-5">Login</h1>
            <form className="flex flex-col items-center" onSubmit={handleRegister}>
                <Input 
                    label="Email" 
                    type="text" 
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                />
                <Input 
                    label="Senha" 
                    type="password" 
                    name="senha"
                    value={usuario.senha}
                    onChange={handleChange}
                />
                <Button title="Entrar" type="submit" />
            </form>
        </div>
    )
}