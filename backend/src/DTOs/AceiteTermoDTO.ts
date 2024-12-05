export interface AceiteTermoDTO {
    id: number;
    itens: {
        id: number;
        aceito: boolean;
    }[];
}