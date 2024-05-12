import './style.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n/config'
import PrimeVue from 'primevue/config'
import { primeVueConfig } from './primeVueConfig'
// @ts-ignore
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { VueQueryPlugin } from '@tanstack/vue-query'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

library.add(fas, far, fab)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(PrimeVue, primeVueConfig)
app.use(VueQueryPlugin)
app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)

app.directive('tooltip', Tooltip)

app.mount('#app')
