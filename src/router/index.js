import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '/src/views/Home.vue'
import Manage from '/src/views/Manage.vue'


const routes = [
  {
      path: '/',
      name: "Home",
      component: HomePage
  },
  {
    path: '/manage',
    name: "Manage",
    component: Manage
},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'text-amber-500'
})

export default router