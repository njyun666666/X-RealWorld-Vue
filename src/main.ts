import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
// import Lara from './presets/lara' //import preset

const app = createApp(App)
app.use(PrimeVue, {
  unstyled: true
  //   pt: Lara //apply preset
})

app.use(createPinia())
app.use(router)

app.mount('#app')
