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

export interface ArticleCreateModel {
  article: ArticleCreate
}

export interface ArticleCreate {
  title: string
  description: string
  body: string
  tagList?: string[]
}

class ArticleService {
  getArticleBySlug(slug: string) {
    return realworldAPI.get<SingleArticleViewModel>(`/api/articles/${slug}`)
  }

  getArticles(data?: ArticleModel) {
    return realworldAPI.get<MultipleArticleViewModel>('/api/articles', { params: data })
  }

  createArticle(data: ArticleCreateModel) {
    return realworldAPI.post<SingleArticleViewModel>(`/api/articles`, data)
  }

  updateArticle(slug: string, data: ArticleCreateModel) {
    return realworldAPI.put<SingleArticleViewModel>(`/api/articles/${slug}`, data)
  }

  deleteArticle(slug: string) {
    return realworldAPI.delete<SingleArticleViewModel>(`/api/articles/${slug}`)
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
