import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
import VueTheMask from 'vue-the-mask'
app.use(VueTheMask)
app.use(router)
app.mount('#app')
