import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
      path: '/',
      name: "Home",
      component: () => import('/src/views/Home.vue')
  },
  {
    path: '/manage',
    name: "Manage",
    meta:{requiresAuth: true},
    component: () => import('/src/views/Manage.vue')
  },
  {
      path: '/:catchAll(.*)*',
      name: "404",
      component: () => import('/src/views/404.vue')
  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'text-amber-500',

})



export default router