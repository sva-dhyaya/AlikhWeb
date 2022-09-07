import { createStore } from 'vuex'

import UserModule from "./users/index.js"
import ReviewModule from "./reviews/index.js"
import FilesModule from "./files/index.js"

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users: UserModule,
    reviews: ReviewModule,
    files:FilesModule
  }
})
