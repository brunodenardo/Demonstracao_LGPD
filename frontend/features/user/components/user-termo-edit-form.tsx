'use client';

import { Button } from "@/components/button";
import { useEffect, useState } from "react";
import { getTermoAtual, updateTermo } from "../api/user";

export default function UserTermEditForm() {
    const [termo, setTermo] = useState<TermoDeUso>({ id: 0, itens: [] });

    useEffect(() => {
        async function fetchTerm() {
            const termo  = await getTermoAtual();
            setTermo(termo);
        }

        fetchTerm();
    }, []);

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
        await updateTermo(termo)
            .then(() => window.alert("Preferências atualizadas com sucesso"))
            .catch(() => window.alert("Erro ao atualizar suas preferências"));
    }

    return (
        <div className="w-full bg-white p-10 rounded">
            <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
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
                <button className="px-4 py-2 text-sm font-semibold rounded w-fit border" type="submit">Atualizar Termos</button>       
            </form>
        </div>
    )
}