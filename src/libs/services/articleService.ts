import type { AxiosResponse } from 'axios'
import realworldAPI from '../api/realworldAPI'
import type { Profile } from './profileService'

export interface SingleArticleViewModel extends ArticleBase<Article> {}
export interface ArticleCreateModel extends ArticleBase<ArticleCreate> {}

export interface ArticleBase<T> {
  article: T
}

export interface ArticleModel {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}

export interface MultipleArticleViewModel {
  articles: Article[]
  articlesCount: number
}

export interface Article {
  slug: string
  title: string
  description: string
  body?: string
  tagList: string[]
  createdAt: Date
  updatedAt: Date
  favorited: boolean
  favoritesCount: number
  author: Profile
}

export interface ArticleCreate {
  title: string
  description: string
  body: string
  tagList?: string[]
}

class ArticleService {
  readonly getArticleBySlugUrl = '/api/articles'
  readonly getArticlesUrl = '/api/articles'
  readonly createArticleUrl = '/api/articles'
  readonly updateArticleUrl = '/api/articles'
  readonly deleteArticleUrl = '/api/articles'
  readonly addFavoriteUrl = '/api/articles/*/favorite'

  getArticleBySlug(slug: string) {
    return realworldAPI
      .get<SingleArticleViewModel>(`${this.getArticleBySlugUrl}/${slug}`)
      .then((res) => {
        res.data.article.body = res.data.article.body?.replace(/\\n/g, '\n')
        res.data.article.author.bio = (res.data.article.author.bio ?? '').replace(/\\n/g, '\n')
        return res
      })
  }

  getArticles(data?: ArticleModel) {
    return realworldAPI
      .get<MultipleArticleViewModel>(this.getArticlesUrl, { params: data })
      .then((res) => {
        console.log(res)
        res.data.articles.forEach((item) => {
          // item.body = item.body?.replace(/\\n/g, '\n')
          item.author.bio = (item.author?.bio ?? '').replace(/\\n/g, '\n')
        })
        return res
      })
  }

  createArticle(data: ArticleCreateModel) {
    return realworldAPI.post<SingleArticleViewModel>(`/api/articles`, data).then((res) => {
      res.data.article.body = res.data.article.body?.replace(/\\n/g, '\n')
      res.data.article.author.bio = (res.data.article.author.bio ?? '').replace(/\\n/g, '\n')
      return res
    })
  }

  updateArticle(slug: string, data: ArticleCreateModel) {
    return realworldAPI.put<SingleArticleViewModel>(`/api/articles/${slug}`, data).then((res) => {
      res.data.article.body = res.data.article.body?.replace(/\\n/g, '\n')
      res.data.article.author.bio = (res.data.article.author.bio ?? '').replace(/\\n/g, '\n')
      return res
    })
  }

  mergeArticle(
    data: ArticleCreateModel,
    slug?: string
  ): Promise<AxiosResponse<SingleArticleViewModel>> {
    if (slug) {
      return this.updateArticle(slug, data)
    }

    return this.createArticle(data)
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
    return realworldAPI
      .post<SingleArticleViewModel>(`/api/articles/${slug}/favorite`)
      .then((res) => {
        res.data.article.body = res.data.article.body?.replace(/\\n/g, '\n')
        res.data.article.author.bio = (res.data.article.author.bio ?? '').replace(/\\n/g, '\n')
        return res
      })
  }

  deleteFavorite(slug: string) {
    return realworldAPI
      .delete<SingleArticleViewModel>(`/api/articles/${slug}/favorite`)
      .then((res) => {
        res.data.article.body = res.data.article.body?.replace(/\\n/g, '\n')
        res.data.article.author.bio = (res.data.article.author.bio ?? '').replace(/\\n/g, '\n')
        return res
      })
  }
}
export const articleService = new ArticleService()
