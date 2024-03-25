import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import HttpStatusCodes from './httpStatusCodes'
import appConfig from '@/appConfig'
import { useLoginStore } from '@/stores/login'
import { loginService } from '../services/loginService'

export interface ResponseErrors {
  errors: {
    [key: string]: string | string[]
  }
}

const baseURL = appConfig.PM_API
const controller = new AbortController()
const CancelToken = axios.CancelToken
const source = CancelToken.source()
let isRefreshing = false
let refreshPromise: Promise<boolean>

const pmAPI: Readonly<AxiosInstance> = axios.create({
  baseURL: baseURL
})

const AuthInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const login = useLoginStore()
  const accessToken = login.access_token

  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`
    config.cancelToken = source.token
    config.signal = controller.signal
  }
  return config
}

const OnResponseSuccess = (response: AxiosResponse): AxiosResponse => response

const OnResponseFailure = async (error: AxiosError<ResponseErrors>): Promise<ResponseErrors> => {
  const httpStatus = error.response?.status
  const login = useLoginStore()

  switch (httpStatus) {
    case HttpStatusCodes.UNAUTHORIZED:
      if (error.config?.url?.toLowerCase() === '/api/Login'.toLowerCase()) {
        //
      } else if (error.config?.url?.toLowerCase() === '/api/Login/RefreshToken'.toLowerCase()) {
        console.log('Refresh token failed')
        source.cancel()
        login.logout()
      } else {
        // check have reflash token
        console.log('check have reflash token')
        const refresh_token = login.refresh_token

        if (!refresh_token) {
          console.log('refresh_token is null', error)
          source.cancel()
          login.logout()
        } else {
          // call refresh token
          if (!isRefreshing) {
            console.info('call refresh token')
            isRefreshing = true
            refreshPromise = loginService.refresh()
          }

          const isRefresh = await refreshPromise
          isRefreshing = false

          if (!isRefresh) {
            console.log('RefreshToken error')
            source.cancel()
            login.logout()
          } else {
            return await pmAPI.request(error.config as AxiosRequestConfig)
          }
        }
      }

      break
    case HttpStatusCodes.NOT_FOUND:
      // console.log('Requested resource was not found.');
      break
    case HttpStatusCodes.FORBIDDEN:
      break
    default:
      break
  }

  return Promise.reject(error)
}

pmAPI.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
pmAPI.interceptors.request.use(AuthInterceptor)
pmAPI.interceptors.response.use(OnResponseSuccess, OnResponseFailure)

export default pmAPI
