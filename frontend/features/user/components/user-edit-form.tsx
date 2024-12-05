'use client';

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/user";

export default function UserEditForm() {
    const [usuario, setUsuario] = useState<User>({
        nome_completo: "",
        data_nascimento: "",
        cpf: "",
        cep: "",
        email: "",
        senha: ""
    });
    const [termo, setTermo] = useState<TermoDeUso>({ id: 0, itens: [] });

    useEffect(() => {
        async function fetchUser() {
            const { user, termo } = await getUser();
            user.data_nascimento = new Date(user.data_nascimento).toISOString().split('T')[0];
            setUsuario({
                nome_completo: user.nome_completo || "",
                data_nascimento: user.data_nascimento || "",
                cpf: user.cpf || "",
                cep: user.cep || "",
                email: user.email || "",
                senha: user.senha || ""
            });

            setTermo(termo);
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

    function handleCheckItem(index: number) {
        setTermo(prevTermo => {
            const newTermo = { ...prevTermo };
            newTermo.itens = [...prevTermo.itens];
            newTermo.itens[index] = { ...newTermo.itens[index], aceito: !newTermo.itens[index].aceito };
            return newTermo;
        });
    };

    async function handleSubmit(e: any) {
        e.preventDefault();

        await updateUser(usuario, termo)
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
                <hr className="w-full my-6" />
                <div className="w-full flex flex-col gap-2">
                    <h2 className="font-semibold">Termos de Uso</h2>
                    {termo?.itens.map((item, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={item.aceito}
                                    disabled={item.obrigatorio}
                                    onChange={() => handleCheckItem(index)}
                                />
                                {`  ${item.descricao} ${item.obrigatorio ? '(Obrigatório)' : ''}`}
                            </label>
                        </div>
                    ))}
                </div>
                <Button title="Atualizar" type="submit" />
            </form>
        </div>
    )
}