import Link from "next/link";

export default function Home() {
    return (
        <div className="w-1/2 bg-white p-10 rounded flex justify-between items-center">
            <Link 
                href=""
                className="text-zinc-600 hover:text-zinc-900 transition-colors"
            >
                • Atualizar dados
                </Link>
            <button 
                className="px-4 py-2 text-red-600 text-sm font-semibold rounded w-fit border border-red-600 hover:bg-red-50 transition-colors"
            >
                Excluir conta
            </button>
        </div>
    )
}