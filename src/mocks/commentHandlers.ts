import appConfig from '@/appConfig'
import { HttpResponse, delay, http } from 'msw'
import { multipleCommentFaker, singleCommentFaker } from '@/libs/faker/commentFaker'

export const commentHandlers = [
  http.post(`${appConfig.REALWORLD_API}/api/articles/:slug/comments`, async ({ params }) => {
    await delay()
    return HttpResponse.json(singleCommentFaker(params.slug as string))
  }),
  http.get(`${appConfig.REALWORLD_API}/api/articles/:slug/comments`, async ({ params }) => {
    await delay()
    return HttpResponse.json(multipleCommentFaker(params.slug as string))
  }),
  http.delete(`${appConfig.REALWORLD_API}/api/articles/:slug/comments`, async () => {
    await delay()
    return HttpResponse.json({})
  })
]
