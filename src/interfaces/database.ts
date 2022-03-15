export interface DATABASE {
    jogadores: JOGADOR[],
    timeName: string
}

export interface JOGADOR {
    nome: string,
    foto: string,
    scores: SCORE[],
}

export interface SCORE {
    score: number | null,
    changeAt: string,
    hash: string
}