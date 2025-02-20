import appConfig from '@/appConfig'
import { userService } from '@/libs/services/userService'
import { HttpResponse, http } from 'msw'
import { userFaker } from '@/libs/faker/userFaker'

export const userHandlers = [
  http.post(`${appConfig.REALWORLD_API}${userService.loginUrl}`, () => {
    return HttpResponse.json(userFaker())
  }),
  http.post(`${appConfig.REALWORLD_API}${userService.registrationUrl}`, () => {
    return HttpResponse.json(userFaker())
  }),
  http.put(`${appConfig.REALWORLD_API}${userService.updateUrl}`, () => {
    return HttpResponse.json(userFaker())
  }),
  http.get(`${appConfig.REALWORLD_API}${userService.authenticationUrl}`, () => {
    return HttpResponse.json(userFaker())
  })
]
