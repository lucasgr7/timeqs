import { defineStore } from 'pinia'
import axios, { type AxiosRequestConfig } from 'axios'
import INIT_STRUCTURE from '@/services/init'
import { ERRORS } from '@/constants/errors'
import { SYSTEM } from '@/constants'
import { handleStorageInitiatilization, fetch } from '@/services/storage'
import { getRandomString } from '@/services/hash-generator'
import { syncDatabase } from '@/services/syncronizer'

const URL_REMOTE_DB = import.meta.env.VITE_URL_STORAGE

const toJS = (data: any): any => {
  return JSON.parse(data)
}

export const store = defineStore({
  id: 'timeqs-store',
  state: () => ({
    localDb: {} as any,
    externalDb: {} as any,
    jogadores: [],
    hash: '',
    timeName: '',
  }),
  getters: {
    getEditPlayers: (state) => {
      const date = new Date();
      return state.jogadores.filter((x: any) => {
        if(!x.edittableDate) return x;
        const edittableDate = new Date(x.edittableDate);
        if(date > edittableDate){
          return x
        }
      })
      //TODO: Filtrar fora usuários que não tenha passado 7 dias após storage aplicação
    }
  },
  actions: {
    async init(timeName: string) {
      if(timeName == null) return;
      this.timeName = timeName;
      await this.fetchRemoteDb(timeName);

      // hash initialization
      this.createLocalHash()

      // fetch latest local db
      this.$patch({
        localDb: handleStorageInitiatilization(this.externalDb)
      })

      this.jogadores = this.localDb[timeName].jogadores;
    },
    async fetchRemoteDb(timeName: string){
      const response = await axios.get(URL_REMOTE_DB)
      this.$patch({
        externalDb: INIT_STRUCTURE(timeName, response.data)
      });
    },
    createLocalHash(){
      // if i don't have local Hash, create
      if(this.hash !== '') return;

      const localHash = fetch('hash')
      if(!localHash){
        this.$patch({
          hash: getRandomString(40)
        })
      }else{
        this.hash = localHash;
      }

    },
    setUserScore(playerIndex: string, score: number) {
      this.$patch((state) => {
        let playerScores = state.localDb[this.timeName].jogadores[playerIndex].scores
        if(!playerScores){
          playerScores = [];
        }
        let found = false;
        if(playerScores.length > 0){
          playerScores.forEach((pontuation: any) => {
            if(pontuation.hash == this.hash){
              pontuation.score = score;
              found = true,
              pontuation.changeAt = new Date().toLocaleString('pt-BR')
              return
            }
          })
        }
        if(!found){
          playerScores.push({
            hash: this.hash,
            score,
            changeAt: new Date().toLocaleString('pt-BR')
          })
        }
        state.localDb[this.timeName].jogadores[playerIndex].scores = playerScores
      })
    },
    async sync() {
      const timeName = this.timeName ?? ''

      // download latest version
      await this.fetchRemoteDb(timeName);

      // sync with local changes
      const remoteDb = syncDatabase(this.$state.externalDb, this.$state.localDb, this.$state.hash, this.timeName);

      // stores remotelly
      const config = {
        headers: {
          'content-type': 'application/json'
        }
      } as AxiosRequestConfig<any>
      await axios.put(`${URL_REMOTE_DB}/?apiKey=${import.meta.env.VITE_API_KEY}`, remoteDb, config)

    }
  }
});
