import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { globalCookiesConfig } from "vue3-cookies";
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

globalCookiesConfig({
  expireTimes: "2d",
  path: "/",
})

import Utils from "./alikh.utils.js"

let app = createApp(App)
app.use(store)
app.use(router)
app.use(vuetify)
app.use(Toast, Utils.getToastNotificationOptions())
app.mount('#app')
