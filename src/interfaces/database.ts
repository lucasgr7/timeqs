export interface DATABASE {
    jogadores: JOGADOR[],
    nodes: []
}

export interface JOGADOR {
    nome: string,
    foto: string
}