import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Article } from '@/libs/services/articleService'

export const useArticleStore = defineStore('article', () => {
  const articles = ref<Article[]>([])
  const savedScrollY = ref(0)

  return { articles, savedScrollY }
})
