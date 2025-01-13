import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import Puzzles from '../views/Puzzles/Puzzles.vue'
import Puzzles from '../views/Puzzles/Puzzles.vue'
import SetPuzzle from '../views/Puzzles/SetPuzzle.vue'
import PlayPuzzle from '../views/Puzzles/PlayPuzzle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:'/puzzles',
      name:'puzzles',
      component: Puzzles,
      children:[
        {
          path:'/set-puzzle',
          name:'set-puzzle',
          component:SetPuzzle
        },
        {
          path:'/play-puzzles',
          name:'play-puzzles',
          component:PlayPuzzle
        }
      ]
    }
  ],
})

export default router
