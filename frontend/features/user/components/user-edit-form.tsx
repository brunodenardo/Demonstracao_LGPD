'use client';

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../api/user";
import Link from "next/link";

export default function UserEditForm({ userId }: { userId: string }) {
    const [usuario, setUsuario] = useState({
        nome_completo: "",
        data_nascimento: "",
        senha: "",
        email: "",
        cpf: "",
        cep: "",
    });

    // useEffect(() => {
    //     async function fetchUser() {
    //         const user = await getUserById(userId);
    //         setUsuario(user);
    //     }

    //     if(!userId) return;
    //     fetchUser();
    // }, [userId])

    function handleChange(e: any) {
        const { name, value } = e.target;
        setUsuario(usuario => ({
            ...usuario,
            [name]: value
        }));
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        
        await updateUser(userId, usuario);
    }

    return (
        <div className="bg-white p-10 rounded">
            <Link href="/home" className="text-2xl font-bold">←</Link>
            <p className="text-lg font-semibold mb-5">Atualização de dados</p>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
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
                <Button title="Atualizar" type="submit" />
            </form>
        </div>
    )
}