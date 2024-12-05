import { api, endpoints } from "@/lib/api-client";

export async function register(data: User, termo: TermoDeUso): Promise<void> {
    console.log(data)
    return await api.post(endpoints.auth.register, {
        usuario: data,
        termo
    });
}

export async function login(data: UserLogin): Promise<{ usuarioAtivo: boolean }> {
    const res = await api.post(endpoints.auth.login, data)

    const { token, usuarioAtivo } = res.data;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
    
    return usuarioAtivo;
}

export async function getTermosDeUso(): Promise<TermoDeUso> {
    const res = await api.get<TermoDeUso>(endpoints.termos.get);
    return res.data;
}