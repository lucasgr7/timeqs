import { defineStore } from 'pinia'
import axios from 'axios'
import INIT_STRUCTURE from '@/services/init'
import { ERRORS } from '@/constants/errors'
import { SYSTEM } from '@/constants'
import { handleStorageInitiatilization, fetch } from '@/services/storage'
import { getRandomString } from '@/services/hash-generator'

const URL_REMOTE_DB = 'https://api.jsonstorage.net/v1/json/bfe126d4-2c26-4094-a36c-fd18ce3c8ca2/6e4f117c-e763-426a-bf50-2ca0883903a4'

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
    }
  },
  actions: {
    async init(timeName: string) {
      if(timeName == null) return;
      this.timeName = timeName;
      const response = await axios.get(URL_REMOTE_DB)
      this.$patch({
        externalDb: INIT_STRUCTURE(timeName, response.data)
      })

      // hash initialization
      this.createLocalHash()

      // fetch latest local db
      this.$patch({
        localDb: handleStorageInitiatilization(this.externalDb)
      })

      this.jogadores = this.localDb[timeName].jogadores;
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
              pontuation.changeAt = new Date().toJSON()
              return
            }
          })
        }
        if(!found){
          playerScores.push({
            hash: this.hash,
            score,
            changeAt: new Date().toJSON()
          })
        }
        state.localDb[this.timeName].jogadores[playerIndex].scores = playerScores
      })
    },
    sync() {
      // TODO: Criar método de sincronização com json remoto
    }
  }
});
