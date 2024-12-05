import { api, endpoints } from "@/lib/api-client";

export async function getUser(): Promise<{ user: User, termo: TermoDeUso }> {
    const res = await api.get(endpoints.user.listOne);

    console.log(res.data)
    return res.data;
}

export async function updateUser(usuario: User, termo: TermoDeUso): Promise<void> {
    try {
        const res = await api.put(endpoints.user.update, {
            usuario,
            termo
        });
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