import { api, endpoints } from "@/lib/api-client";

export async function getUser(): Promise<User> {
    const res = await api.get(endpoints.user.listOne);

    return res.data;
}

export async function getTermoAtual(): Promise<TermoDeUso> {
    const res = await api.get(endpoints.user.termChoices);

    return res.data;
}

export async function updateUser(usuario: User): Promise<void> {
    try {
        await api.put(endpoints.user.update, usuario);
        return;
        
    } catch (error) {
        throw error;
    }
}

export async function updateTermo(termo: TermoDeUso): Promise<void> {
    try {
        await api.post(endpoints.user.updateTerm, termo);
        return;
        
    } catch (error) {
        throw error;
    }
}

export async function deactivateUser(): Promise<void> {
    try {
        const res = await api.put(endpoints.user.deactivate);
        return;
        
    } catch (error) {
        throw error;
    }
}

export async function reactivateUser(): Promise<void> {
    try {
        const res = await api.put(endpoints.user.reactivate);
        return;
        
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(): Promise<void> {
    try {
        const res = await api.delete(endpoints.user.delete);
        return;
        
    } catch (error) {
        throw error;
    }
}