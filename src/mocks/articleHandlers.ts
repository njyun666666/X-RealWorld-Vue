import appConfig from '@/appConfig'
import { HttpResponse, http } from 'msw'
import { articleService } from '@/libs/services/articleService'
import { multipleArticleFaker, singleArticleFaker } from '@/libs/faker/articleFaker'

export const articleHandlers = [
  //getArticleBySlug
  http.get(`${appConfig.REALWORLD_API}/api/articles/:slug`, ({ params }) => {
    return HttpResponse.json(singleArticleFaker(undefined, params.slug as string))
  }),
  //getArticles
  http.get(`${appConfig.REALWORLD_API}/api/articles`, ({ request }) => {
    const url = new URL(request.url)
    const author = url.searchParams.get('author')

    return HttpResponse.json(multipleArticleFaker(author as string))
  }),
  //createArticle
  http.post(`${appConfig.REALWORLD_API}${articleService.createArticleUrl}`, () => {
    return HttpResponse.json(singleArticleFaker())
  }),
  //updateArticle
  http.put(`${appConfig.REALWORLD_API}${articleService.updateArticleUrl}/*`, () => {
    return HttpResponse.json(singleArticleFaker())
  }),
  //deleteArticle
  http.delete(`${appConfig.REALWORLD_API}${articleService.updateArticleUrl}/*`, () => {
    return HttpResponse.json(singleArticleFaker())
  }),
  //addFavorite
  http.post(`${appConfig.REALWORLD_API}${articleService.addFavoriteUrl}`, () => {
    return HttpResponse.json(singleArticleFaker())
  }),
  //deleteFavorite
  http.delete(`${appConfig.REALWORLD_API}${articleService.addFavoriteUrl}`, () => {
    return HttpResponse.json(singleArticleFaker())
  })
]
