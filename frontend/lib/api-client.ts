import Axios from "axios";

export const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const endpoints = {
    auth: {
        register: "/user/cadastrar",
        login: "user/login",
    },
    user: {
        listOne: `/user/listarDados`,
        update: "/user/atualiza",
        deactivate: "/user/desativa",
        reactivate: "/user/ativa",
        delete: "/user/esquece",
    }
}