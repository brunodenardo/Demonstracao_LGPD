'use client';

import { Button } from "@/components/button";
import { api, endpoints } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TermosDeUso() {
    const [termo, setTermo] = useState<TermoDeUso>({ id: 0, itens: [] });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkTerm = async () => {
            try {
                const res = await api.get(endpoints.user.checkTerm);
                const termoEntregue = res.data;

                if (termoEntregue) {
                    router.push("/home");
                    return;
                }

                const resTermo = await api.get<TermoDeUso>(endpoints.termos.get);

                const termo = resTermo.data
                termo.itens.forEach(item => item.obrigatorio ? item.aceito = true : item.aceito = false);
                setTermo(resTermo.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        checkTerm();
    }, [router]);

    function handleCheckItem(index: number) {
        setTermo(prevTermo => {
            const newTermo = { ...prevTermo };
            newTermo.itens = [...prevTermo.itens];
            newTermo.itens[index] = { ...newTermo.itens[index], aceito: !newTermo.itens[index].aceito };
            return newTermo;
        });
    };

    async function handleAccept(e: any) {
        e.preventDefault();
        await api.post(endpoints.user.acceptTerm, termo)
            .then(() => {
                router.push("/home");
            })
            .catch((error) => {
                console.error("Falha ao aceitar os novos termos", error);
                window.alert("Falha ao aceitar os novos termos");

            })

    }

    if (loading) {
        return null;
    }

    return (
        <div className="bg-white p-10 rounded">
            <form className="flex flex-col items-center" onSubmit={handleAccept}>
                <div className="w-full flex flex-col gap-4">
                    <p>Há uma nova versão dos termos de uso, confira:</p>
                    <h2 className="w-full font-semibold text-center">Termos de Uso</h2>
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
                    <p className="text-sm">Ao clicar em cadastrar, você concorda com os termos selecionados</p>
                </div>
                <Button title="Aceitar" type="submit" />
            </form>
        </div>
    );
}
