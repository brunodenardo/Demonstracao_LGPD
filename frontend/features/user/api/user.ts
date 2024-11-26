import { api, endpoints } from "@/lib/api-client";

export async function getUserById(id: string) {
    const res = await api.get<User>(endpoints.user.listOne(id));

    return res.data;
}

export async function updateUser(id: string, user: User) {
    try {
        const res = await api.put(endpoints.user.update, {
            id_usuario: id,
            ...user
        });
        return res.data;
        
    } catch (error) {
        throw error;
    }
}