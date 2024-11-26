'use client';

import { useState } from "react";
import Link from "next/link";
import Modal from "@/components/modal";

export default function Home() {
    const [modal, setModal] = useState(false);

    return (
        <>
            <div className="w-1/2 bg-white p-10 rounded flex justify-between items-center">
                <Link
                    href={`/user/${1}/editar`}
                    className="text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                    • Atualizar dados
                </Link>
                <button
                    className="px-4 py-2 text-red-600 text-sm font-semibold rounded w-fit border border-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => setModal(true)}
                >
                    Excluir conta
                </button>
            </div>
            <Modal
                isOpen={modal}
                onClose={() => setModal(false)}
                title="Excluir conta"
            >
                <div className="flex flex-col gap-4 w-96">
                    <p className="text-sm">
                        Excluir sua conta resultará na remoção permanente de todos os seus dados. Não será possível recuperar esses dados. Caso deseje retornar depois, desative sua conta.
                    </p>
                    <div className="w-full flex justify-center gap-10 mt-5">
                        <button
                            className="px-4 py-2 bg-red-700 text-white text-sm font-semibold rounded w-fit hover:bg-red-600 transition-colors"
                        >
                            Excluir conta
                        </button>
                        <button
                            className="px-4 py-2 text-red-600 text-sm font-semibold rounded w-fit border border-red-600 hover:bg-red-50 transition-colors"
                        >
                            Desativar conta
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}