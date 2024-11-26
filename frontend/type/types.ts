interface UserRegister {
    nome_completo: string;
    data_nascimento: string;
    senha: string;
    email: string;
    cpf: string;
    cep: string;
}

interface UserLogin {
    email: string;
    senha: string;
}

interface LoginResponse {
    token: string;
}