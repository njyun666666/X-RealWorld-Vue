import './style.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n/config'
import PrimeVue from 'primevue/config'
// @ts-ignore
import PrimeOne from 'primevue/themes/primeone'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { preset } from './preset'

library.add(fas, far, fab)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(PrimeVue, {
  theme: {
    base: PrimeOne,
    preset: preset,
    options: {
      darkModeSelector: 'html.dark'
    }
  }
})

app.mount('#app')
