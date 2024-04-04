import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n/config'
import PrimeVueStyled from 'primevue/styled'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
// @ts-ignore
app.use(PrimeVueStyled)

app.mount('#app')
