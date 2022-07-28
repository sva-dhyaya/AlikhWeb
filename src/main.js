import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue3-cookies'


let app = createApp(App)
app.use(store)
app.use(router)
app.use(VueCookies, {
    expireTimes: "2d",
    path: "/",
});
app.mount('#app')
