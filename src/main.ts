import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import '@/styles/index.scss'

import '../mock'

createApp(App).use(router).mount('#app')
