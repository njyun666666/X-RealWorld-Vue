import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', () => {
  const savedScrollY = ref(0)

  return { savedScrollY }
})
