import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlikhView from "../views/AlikhView.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/alikh',
    name: 'alikh',
    component: AlikhView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
