import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import AddPlayer from '@/views/AddPlayer.vue'
import Players from '@/views/Players.vue'
import ListPlayersVue from '@/views/ListPlayers.vue'
import GroupTeams from '@/views/GroupTeams.vue'
 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notfound',
      component: NotFound
    },
    {
      path: '/:timeName',
      name: 'jogadores',
      component: Players
    },
    {
      path: '/:timeName/players/new',
      name: 'addPlayer',
      component: AddPlayer
    },
    {
      path: '/:timeName/players',
      name: 'listPlayers',
      component: ListPlayersVue
    },
    {
      path: '/:timeName/teams',
      name: 'teams',
      component: GroupTeams
    }
  ]
})

export default router
