import { api, endpoints } from "@/lib/api-client";

export async function getUser(): Promise<User> {
    const res = await api.get<User>(endpoints.user.listOne);

    return res.data;
}

export async function updateUser(user: User): Promise<void> {
    try {
        const res = await api.put(endpoints.user.update, user);
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