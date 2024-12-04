'use client';

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useState } from "react";
import { register } from "../api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
    const router = useRouter();

    const [usuario, setUsuario] = useState({
        nome_completo: "",
        data_nascimento: "",
        senha: "",
        email: "",
        cpf: "",
        cep: "",
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
        await register(usuario)
            .then(() => {
                window.alert("Usuário cadastrado com sucesso!");
                router.push("/login");
            })
            .catch((error) => {
                window.alert("Erro ao cadastrar usuário!");
                console.log(error)
            });
    }

    return (
        <div className="bg-white p-10 rounded">
            <h1 className="text-lg font-semibold mb-5">Cadastro de Usuário</h1>
            <form className="flex flex-col items-center" onSubmit={handleRegister}>
                <Input 
                    label="Nome Completo" 
                    type="text" 
                    name="nome_completo"
                    value={usuario.nome_completo}
                    onChange={handleChange}
                />
                <Input 
                    label="Data de Nascimento" 
                    type="date" 
                    name="data_nascimento"
                    value={usuario.data_nascimento}
                    onChange={handleChange}
                />
                <Input 
                    label="CPF" 
                    type="text" 
                    name="cpf"
                    value={usuario.cpf}
                    onChange={handleChange}
                />
                <Input 
                    label="CEP" 
                    type="text" 
                    name="cep"
                    value={usuario.cep}
                    onChange={handleChange}
                />
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
                <Button title="Cadastrar" type="submit" />
                <Link href="/login" className="text-sm underline">Login</Link>
            </form>
        </div>
    )
}