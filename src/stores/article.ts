import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLoginStore } from './login'

export type ArticleTabType = 'yourFeed' | 'globalFeed' | 'search'

export const useArticleStore = defineStore('article', () => {
  const login = useLoginStore()
  const activeTab = ref(login.loginState ? 0 : 1)
  const scrollY = ref<{ [key in ArticleTabType]: number }>({
    yourFeed: 0,
    globalFeed: 0,
    search: 0
  })

  const setSavedScrollY = (key: ArticleTabType, num: number) => {
    scrollY.value[key] = num
  }

  return { activeTab, scrollY, setSavedScrollY }
})
