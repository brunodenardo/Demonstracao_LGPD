export default interface CadastroTermosDTO{
    versao: string;
    itens: {
        descricao: string;
        obrigatorio: boolean;
    }[]
}