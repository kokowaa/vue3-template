import { createApp } from 'vue'
import { createPinia } from 'pinia'
import mitt from 'mitt'

import router from './router'

import './reset.css'
import App from './App.vue'

const event = mitt()
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

/** 全局属性挂载 */
app.config.globalProperties.$event = event

app.mount('#app')
