'use client';

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/user";
import Link from "next/link";

export default function UserEditForm() {
    const [usuario, setUsuario] = useState<User>({
        nome_completo: "",
        data_nascimento: "",
        cpf: "",
        cep: "",
        email: "",
        senha: ""   
    });

    useEffect(() => {
        async function fetchUser() {
            const user = await getUser();
            user.data_nascimento = new Date(user.data_nascimento).toISOString().split('T')[0];
            setUsuario({
                nome_completo: user.nome_completo || "",
                data_nascimento: user.data_nascimento || "",
                cpf: user.cpf || "",
                cep: user.cep || "",
                email: user.email || "",
                senha: user.senha || ""
            });
        }

        fetchUser();
    }, [])

    function handleChange(e: any) {
        const { name, value } = e.target;
        setUsuario(usuario => ({
            ...usuario,
            [name]: value
        }));
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        
        await updateUser(usuario)
            .then(() => window.alert("Dados atualizado com sucesso"))
            .catch(() => window.alert("Erro ao atualizar os seus dados"));
    }

    return (
        <div className="w-1/2 bg-white p-10 rounded">
            <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
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
                    disabled
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
                    disabled
                />
                <Input 
                    label="Senha" 
                    type="password" 
                    name="senha"
                    value={usuario.senha}
                    onChange={handleChange}
                />
                <Button title="Atualizar" type="submit" />
            </form>
        </div>
    )
}