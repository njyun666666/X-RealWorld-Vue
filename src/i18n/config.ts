import { createI18n } from 'vue-i18n'
import en from './en.json'
import zh_Hant from './zh-Hant.json'

export const messages = {
  en: en,
  'zh-Hant': zh_Hant
}

type MessageSchema = typeof zh_Hant
type LangType = 'en' | 'zh-Hant'

export const i18n = createI18n<[MessageSchema], LangType>({
  legacy: false,
  locale:
    localStorage.lang || (navigator.language.toLowerCase().startsWith('zh') ? 'zh-Hant' : 'en'),
  fallbackLocale: 'zh-Hant',
  messages
})
