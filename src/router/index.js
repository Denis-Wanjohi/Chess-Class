import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChessView from '../views/ChessView.vue'
import ChessPuzzle from '../views/ChessPuzzle.vue'
import ChessPuzzle2 from '../views/ChessPuzzle2.vue'
import SetPuzzle from '../views/Puzzle/SetPuzzle.vue'
import PlayPuzzle from '../views/Puzzle/PlayPuzzle.vue'
import Login from '@/views/Auth/LoginView.vue'
import Register from '@/views/Auth/RegisterView.vue'
import Dashboard from '@/views/DashboardView.vue'
import Community from '@/views/CommunityView.vue'
import Challanges from '@/views/Play/ChallangeView.vue'
import Play from '@/views/Play/PlayView.vue'
import Puzzles from '@/views/PuzzlesView.vue'
import { useUserStore } from '@/stores/user'
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
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component:Dashboard
    },
    {
      path:'/community',
      name:'community',
      component:Community
    },
    {
      path:'/challanges',
      name:'challanges',
      component:Challanges
    },
    {
      path:'/play',
      name:'play',
      component:Play
    },
    {
      path:'/play/:id',
      name:'play',
      component:Play
    },
    {
      path:'/puzzles',
      name:'puzzles',
      component: Puzzles
    },
    {
      path:'/chess',
      name:'chess',
      component: ChessView
    },
    {
      path:'/puzzle',
      name:'puzzle',
      component:ChessPuzzle
    },
    {
      path:'/puzzle2',
      name:'puzzle2',
      component:ChessPuzzle2
    },
    {
      path:'/set-puzzle',
      name:'set-puzzle',
      component: SetPuzzle
    },
    {
      path:'/play-puzzle',
      name:'play-puzzle',
      component:PlayPuzzle
    }
  ],
})

router.beforeEach((to, from, next) => {
  if(sessionStorage.getItem('auth')){
    let user = JSON.parse(sessionStorage.getItem('user'))
    useUserStore().setId(user.id)
    useUserStore().setFname(user.fname)
    useUserStore().setLname(user.lname)
    useUserStore().setUsername(user.username)
    useUserStore().setEmail(user.email)
    useUserStore().setCountry(user.country)
    useUserStore().setLoggedIn(user.loggedIn)
  }
  const publicPages = ['/', '/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const isAuthenticated = useUserStore().loggedIn
  if (authRequired && !isAuthenticated) {
    return next('/login')
  }else if (isAuthenticated && publicPages.includes(to.path)) {
    return next('/dashboard');
  }
  next()
 
})

export default router
