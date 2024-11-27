'use client';

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useState } from "react";
import { login } from "../api/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

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
        await login(usuario)
            .then((usuario_ativo) => {
                if (!usuario_ativo) {
                    router.push("/user/conta-desativada");
                    return;
                }

                router.push("/home")
            })
            .catch((e) => {
                if (e.response.status === 400) {
                    window.alert("Usuário ou senha inválidos");
                }

                if (e.response.status === 500) {
                    window.alert("Erro no servidor");
                }
            });
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