import appConfig from '@/appConfig'
import { userService } from '@/libs/services/userService'
import { HttpResponse, delay, http } from 'msw'
import { userFaker } from '@/libs/faker/userFaker'

export const userHandlers = [
  http.post(`${appConfig.REALWORLD_API}${userService.loginUrl}`, async () => {
    await delay()
    return HttpResponse.json(userFaker())
  }),
  http.post(`${appConfig.REALWORLD_API}${userService.registrationUrl}`, async () => {
    await delay()
    return HttpResponse.json(userFaker())
  }),
  http.put(`${appConfig.REALWORLD_API}${userService.updateUrl}`, async () => {
    await delay()
    return HttpResponse.json(userFaker())
  }),
  http.get(`${appConfig.REALWORLD_API}${userService.authenticationUrl}`, async () => {
    await delay()
    return HttpResponse.json(userFaker())
  })
]
