import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlikhView from "../views/AlikhView.vue"
import FileBrowse from "@/components/FileBrowse.vue";
import AlikhHome from "@/components/AlikhHome.vue";
import UploadFile from "@/components/UploadPage.vue";
import ReviewFile from "@/components/ReviewFile.vue";
import UsersFile from "@/components/UsersList.vue";

const alikhRoutes = [
  {
    path: 'files',
    name: 'files',
    component: FileBrowse
  },
  {
    path: 'dashboard',
    name: 'dashboard',
    component: AlikhHome
  },
  {
    path: 'upload',
    name: 'upload',
    component: UploadFile
  },
  {
    path: 'review',
    name: 'review',
    component: ReviewFile
  },
  {
    path: 'users',
    name: 'users',
    component: UsersFile
  },
]

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/alikh',
    name: 'alikh',
    component: AlikhView,
    children:alikhRoutes
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
