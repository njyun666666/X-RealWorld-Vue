import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n/config'

import PrimeVue from 'primevue/config'
// @ts-ignore
import PrimeOne from 'primevue/themes/primeone'
// @ts-ignore
import Aura from 'primevue/themes/primeone/aura'
// @ts-ignore
import { definePreset } from 'primevue/themes'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}'
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}'
        }
      }
    }
  }
})

app.use(PrimeVue, {
  theme: {
    base: PrimeOne,
    preset: MyPreset,
    options: {
      darkModeSelector: 'html.dark'
    }
  }
})

app.mount('#app')
