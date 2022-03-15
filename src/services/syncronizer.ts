import type { DATABASE, JOGADOR, SCORE } from "@/interfaces/database";

export const syncDatabase = (persistBase: DATABASE, local: DATABASE, hash: string): DATABASE => {
  persistBase.jogadores = syncJogadores(persistBase.jogadores, local.jogadores, hash)
  return persistBase
}

export const syncJogadores = (persistJogadores: JOGADOR[], localJogadores: JOGADOR[], hash: string): JOGADOR[] => {
  for (const jogador of persistJogadores){
    const found = localJogadores.find((j:JOGADOR) => j.nome === jogador.nome)

    // didn't found local player :(
    if(!found) continue

    jogador.scores.forEach((s:SCORE, idx:number) => {
      if(s.hash === hash){
        s = found.scores.find((s:SCORE) => s.hash === hash)?? {} as SCORE
      }
    })
  }
  return persistJogadores
}