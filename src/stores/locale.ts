import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { LangType } from '@/i18n/config'
import dayjs from 'dayjs'
import '@/i18n/dayjs/zh-tw'

export const useLocaleStore = defineStore('locale', () => {
  const lang = useStorage<LangType>('lang', 'zh-tw')
  const { locale } = useI18n()

  const setLang = (val: LangType) => {
    lang.value = val
    locale.value = val
    document.documentElement.setAttribute('lang', val)
    dayjs.locale(val)
  }

  return { lang, setLang }
})
