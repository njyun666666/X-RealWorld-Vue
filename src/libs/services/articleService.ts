import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
import realworldAPI from '../api/realworldAPI'
import appConst from '@/appConst'

export interface ArticleModel {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}

export interface SingleArticleViewModel {
  article: Article
}

export interface MultipleArticleViewModel {
  articles: Article[]
  articlesCount: number
}

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: Date
  updatedAt: Date
  favorited: boolean
  favoritesCount: number
  author: Author
}

export interface Author {
  username: string
  bio: string
  image: string
  following: boolean
}

class ArticleService {
  queryList: {
    [slug: string]: UseQueryReturnType<Article, Error>
  } = {}

  query(slug: string) {
    if (!this.queryList[slug]) {
      this.queryList[slug] = useQuery({
        queryKey: [this.getArticleBySlug.name, slug],
        queryFn: () => this.getArticleBySlug(slug).then((res) => res.data.article),
        staleTime: appConst.StaleTime
      })
    }

    return this.queryList[slug]
  }

  getArticleBySlug(slug: string) {
    return realworldAPI.get<SingleArticleViewModel>(`/api/articles/${slug}`)
  }

  getArticles(data?: ArticleModel) {
    return realworldAPI.get<MultipleArticleViewModel>('/api/articles', { params: data })
  }
}
export const articleService = new ArticleService()
