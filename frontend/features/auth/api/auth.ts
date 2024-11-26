import { api, endpoints } from "@/lib/api-client";

export async function register(data: User) {
    return await api.post(endpoints.auth.register, data);
}

export async function login(data: UserLogin) {
    const res = await api.post(endpoints.auth.login, data)

    const { token } = res.data;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}