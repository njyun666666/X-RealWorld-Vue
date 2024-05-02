import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLoginStore } from './login'
import { articleService, type Article, type ArticleModel } from '@/libs/services/articleService'

export type ArticleTabType = 'yourFeed' | 'globalFeed' | 'search'

export const useArticleStore = defineStore('article', () => {
  const login = useLoginStore()
  const activeTab = ref(login.loginState ? 0 : 1)
  const scrollY = ref<{ [key in ArticleTabType]: number }>({
    yourFeed: 0,
    globalFeed: 0,
    search: 0
  })
  const article = ref<{ [slug: string]: Article }>({})

  const setSavedScrollY = (key: ArticleTabType, num: number) => {
    scrollY.value[key] = num
  }

  const mergeArticle = (data: Article) => {
    article.value[data.slug] = data
  }

  const getArticleBySlug = async (slug: string) => {
    if (article.value[slug]) {
      return article.value[slug]
    }

    return await articleService.getArticleBySlug(slug).then(({ data }) => {
      mergeArticle(data.article)
      return article.value[slug]
    })
  }

  const getArticles = async (data?: ArticleModel) => {
    return await articleService.getArticles(data).then(({ data }) => {
      data.articles.map((item) => {
        mergeArticle(item)
      })
      return data
    })
  }

  return {
    activeTab,
    scrollY,
    article,
    setSavedScrollY,
    getArticles,
    getArticleBySlug,
    mergeArticle
  }
})
