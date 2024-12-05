'use client';

import { useRouter } from "next/navigation";
import { reactivateUser } from "@/features/user/api/user";

export default function ContaDesativadaPage() {
    const router = useRouter();

    async function handleReactivate() {
        await reactivateUser()
            .then(() => {
                router.push("/termos-uso");
                window.alert("Sua conta foi reativada com sucesso");
            })
            .catch(() => window.alert("Erro ao reativar a sua conta"));
    }

    function handleLogout() {
        localStorage.removeItem("token");
        router.push("/login");
    }

    return (

        <div className="w-1/2 bg-white p-10 rounded flex flex-col gap-5">
            <p>Esta conta está desativada. Caso deseje voltar a utilizar, você pode reativá-la.</p>
            <div className="w-full flex justify-center gap-10">
                <button
                    className="px-4 py-2 text-green-600 text-sm font-semibold rounded w-fit border border-green-600"
                    onClick={handleReactivate}
                >
                    Reativar Conta
                </button>
                <button
                    className="px-4 py-2 text-zinc-600 text-sm font-semibold rounded w-fit border"
                    onClick={handleLogout}
                >
                    Sair
                </button>
            </div>
        </div>

    )
}