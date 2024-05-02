import realworldAPI from '../api/realworldAPI'

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
  getArticleBySlug(slug: string) {
    return realworldAPI.get<SingleArticleViewModel>(`/api/articles/${slug}`)
  }

  getArticles(data?: ArticleModel) {
    return realworldAPI.get<MultipleArticleViewModel>('/api/articles', { params: data })
  }

  toggleFavorite(slug: string, favorited: boolean) {
    if (favorited) {
      return this.addFavorite(slug)
    }

    return this.deleteFavorite(slug)
  }

  addFavorite(slug: string) {
    return realworldAPI.post<SingleArticleViewModel>(`/api/articles/${slug}/favorite`)
  }

  deleteFavorite(slug: string) {
    return realworldAPI.delete<SingleArticleViewModel>(`/api/articles/${slug}/favorite`)
  }
}
export const articleService = new ArticleService()
