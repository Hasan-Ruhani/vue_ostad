import { createApp } from 'vue'
import './style.css'
import { createVfm } from 'vue-final-modal'
import router from './router/router'
import App from './App.vue'
import 'vue-final-modal/style.css'
const vfm = createVfm()

createApp(App).use(vfm).use(router).mount('#app')
