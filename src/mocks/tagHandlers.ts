import appConfig from '@/appConfig'
import { HttpResponse, http } from 'msw'
import { tagService } from '@/libs/services/tagService'
import { tagFaker } from '@/libs/faker/tagFaker'

export const tagHandlers = [
  http.get(`${appConfig.REALWORLD_API}${tagService.getTagsUrl}`, () => {
    return HttpResponse.json(tagFaker())
  })
]
