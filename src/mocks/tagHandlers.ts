import appConfig from '@/appConfig'
import { HttpResponse, delay, http } from 'msw'
import { tagService } from '@/libs/services/tagService'
import { tagFaker } from '@/libs/faker/tagFaker'

export const tagHandlers = [
  http.get(`${appConfig.REALWORLD_API}${tagService.getTagsUrl}`, async () => {
    await delay()
    return HttpResponse.json(tagFaker())
  })
]
