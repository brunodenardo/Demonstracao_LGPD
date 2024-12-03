'use client';

import { useState } from "react";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { deactivateUser, deleteUser } from "@/features/user/api/user";
import UserEditForm from "@/features/user/components/user-edit-form";

export default function Home() {
    const router = useRouter();
    const [modal, setModal] = useState(false);

    async function handleDeactivate() {
        await deactivateUser()
            .then(() => {
                localStorage.removeItem("token");
                router.push("/login");
                window.alert("Sua conta foi desativada com sucesso");
            })
            .catch(() => window.alert("Erro ao desativar a sua conta"));
    }

    async function handleDelete() {
        await deleteUser()
            .then(() => {
                localStorage.removeItem("token");
                router.push("/login");
                window.alert("Sua conta foi excluída com sucesso");
            })
            .catch(() => window.alert("Erro ao excluir a sua conta"));
    }
    
    function handleLogout() {
        localStorage.removeItem("token");
        router.push("/login");
    }

    return (
        <>
            <UserEditForm />
            <div className="w-1/2 bg-white px-10 pb-10 pt-0 rounded flex flex-col gap-5">
                <div className=" flex justify-between items-center">
                    <button
                        className="px-4 py-2 text-red-600 text-sm font-semibold rounded w-fit border border-red-600 hover:bg-red-50 transition-colors"
                        onClick={() => setModal(true)}
                    >
                        Excluir conta
                    </button>
                </div>
                <button
                    className="px-4 py-2 text-zinc-600 text-sm font-semibold rounded w-fit border"
                    onClick={handleLogout}
                >
                    Sair
                </button>
            </div>

            <Modal
                isOpen={modal}
                onClose={() => setModal(false)}
                title="Excluir conta"
            >
                <div className="flex flex-col gap-4 w-96">
                    <p className="text-sm">
                        Excluir sua conta resultará na remoção permanente de todos os seus dados. Não será possível recupera-los. Caso deseje retornar depois, apenas desative sua conta.
                    </p>
                    <div className="w-full flex justify-center gap-10 mt-5">
                        <button
                            className="px-4 py-2 bg-red-700 text-white text-sm font-semibold rounded w-fit hover:bg-red-600 transition-colors"
                            onClick={handleDelete}
                        >
                            Excluir conta
                        </button>
                        <button
                            className="px-4 py-2 text-red-600 text-sm font-semibold rounded w-fit border border-red-600 hover:bg-red-50 transition-colors"
                            onClick={handleDeactivate}
                        >
                            Desativar conta
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}