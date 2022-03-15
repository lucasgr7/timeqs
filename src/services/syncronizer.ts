import type { DATABASE, JOGADOR, SCORE } from "@/interfaces/database";
import { toJson } from "./storage";

export const syncDatabase = (persistBase: any, local: any, hash: string, timeName: string): any => {
  persistBase[timeName].jogadores = syncJogadores(persistBase[timeName].jogadores, local[timeName].jogadores, hash)
  return toJson(persistBase)
}

export const syncJogadores = (persistJogadores: JOGADOR[], localJogadores: JOGADOR[], hash: string): JOGADOR[] => {
  for (const jogador of persistJogadores){
    const localJogadorFound = localJogadores.find((j:JOGADOR) => j.nome === jogador.nome)

    // didn't found local player :(
    if(!localJogadorFound) continue

    // player remote don't have any scores yet
    if(!jogador.scores){
      jogador.scores = localJogadorFound.scores
    }else{
      let hasMineScore = false
      const mineScore = localJogadorFound.scores.find((s:SCORE) => s.hash === hash)
      if(!mineScore){continue}

      jogador.scores.find((s:SCORE, idx:number) => {
        if(s.hash === hash){

          // update user score into remote db
          jogador.scores[idx] = mineScore
          hasMineScore = true
          return
        }
      })
      if(!hasMineScore){
        // push user score into remote db
        jogador.scores.push(mineScore)
      }
    }

  }
  return persistJogadores
}