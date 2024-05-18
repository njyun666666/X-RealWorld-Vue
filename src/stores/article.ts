import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useLoginStore } from './login'
import { articleService, type Article, type ArticleModel } from '@/libs/services/articleService'
import { remove, sortBy } from 'lodash'
import { useProfileStore } from './profile'

export type ArticleTabType = 'yourFeed' | 'globalFeed' | 'search'

export const useArticleStore = defineStore('article', () => {
  const login = useLoginStore()
  const profileStore = useProfileStore()
  const activeTab = ref(login.loginState ? 0 : 1)
  const scrollY = ref<{ [key in ArticleTabType]: number }>({
    yourFeed: 0,
    globalFeed: 0,
    search: 0
  })
  const article = ref<{ [slug: string]: Article }>({})
  const articleList = ref<Article[]>([])

  const globalFeedList = computed(() => {
    return sortBy(articleList.value, ['createdAt']).reverse()
  })

  const yourFeedList = computed(() => {
    if (login.loginState) {
      return sortBy(
        articleList.value.filter((x) => x.author.username == login.user.username),
        ['createdAt']
      ).reverse()
    }

    return [] as Article[]
  })

  const setSavedScrollY = (key: ArticleTabType, num: number) => {
    scrollY.value[key] = num
  }

  const mergeArticle = (data: Article, oldSlug?: string) => {
    article.value[data.slug] = data
    const newArticle = article.value[data.slug]
    const oldExists = articleList.value.find((x) => x.slug == (oldSlug || data.slug))

    if (oldSlug && oldExists && oldSlug != data.slug) {
      remove(articleList.value, { slug: oldSlug })
      articleList.value.push(newArticle)
    } else if (!oldExists) {
      articleList.value.push(newArticle)
    }
  }

  const getArticleBySlug = async (slug: string) => {
    const exists = article.value[slug]

    if (exists) {
      return exists
    }

    return await articleService.getArticleBySlug(slug).then(async ({ data }) => {
      mergeArticle(data.article)
      profileStore.mergeProfile(data.article.author)
      return article.value[slug]
    })
  }

  const getArticles = async (data?: ArticleModel) => {
    return await articleService.getArticles(data).then(({ data }) => {
      data.articles.map((item) => {
        mergeArticle(item)
        profileStore.mergeProfile(item.author)
      })
      return data
    })
  }

  const deleteArticle = async (slug: string) => {
    return await articleService.deleteArticle(slug).then(async (res) => {
      remove(articleList.value, { slug })
      return res
    })
  }

  return {
    activeTab,
    scrollY,
    article,
    articleList,
    globalFeedList,
    yourFeedList,
    setSavedScrollY,
    getArticles,
    getArticleBySlug,
    mergeArticle,
    deleteArticle
  }
})
