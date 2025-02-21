import appConfig from '@/appConfig'
import { HttpResponse, delay, http } from 'msw'
import { getProfileFaker } from '@/libs/faker/profileFaker'

export const profileHandlers = [
  http.get(`${appConfig.REALWORLD_API}/api/profiles/:username`, async ({ params }) => {
    await delay()
    return HttpResponse.json(getProfileFaker(params.username as string))
  }),
  http.post(`${appConfig.REALWORLD_API}/api/profiles/:username/follow`, async () => {
    await delay()
    return HttpResponse.json(getProfileFaker())
  }),
  http.delete(`${appConfig.REALWORLD_API}/api/profiles/:username/follow`, async () => {
    await delay()
    return HttpResponse.json(getProfileFaker())
  })
]
