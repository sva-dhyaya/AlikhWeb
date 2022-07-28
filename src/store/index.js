import { createStore } from 'vuex'

import UserModule from "./users/index.js"

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
    users: UserModule
  }
})
