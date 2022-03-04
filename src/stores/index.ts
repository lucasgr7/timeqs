import { defineStore } from 'pinia'
import axios from 'axios'
import CONSTNATS from '@/constants'
import INIT_STRUCTURE from '@/services/init'

const storage = window.localStorage

const toJson = (data: any): string => {
  return JSON.stringify(data)
}
const toJS = (data: any): any => {
  return JSON.parse(data)
}

export const store = defineStore({
  id: 'counter',
  state: () => ({
    jogadores: []
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
      const response = await axios.get('https://api.jsonstorage.net/v1/json/bfe126d4-2c26-4094-a36c-fd18ce3c8ca2/6e4f117c-e763-426a-bf50-2ca0883903a4')
      const externalDb = INIT_STRUCTURE(timeName, response.data)

      storage.setItem(CONSTNATS.REMOTE_DB, toJson(externalDb))
      const localDb = toJson(storage.getItem(CONSTNATS.LOCAL_DB))

      // first user session
      if (!localDb) {
        storage.setItem(CONSTNATS.LOCAL_DB, toJson(externalDb))
      }
      this.jogadores = externalDb[timeName].jogadores;
    }
  }
})
