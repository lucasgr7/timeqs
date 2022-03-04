import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import Players from '@/views/Players.vue'

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
    }
  ]
})

export default router
