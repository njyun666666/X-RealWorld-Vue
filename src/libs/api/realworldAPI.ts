import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import HttpStatusCodes from './httpStatusCodes'
import appConfig from '@/appConfig'
import { useLoginStore } from '@/stores/login'

export interface ResponseErrors {
  errors: {
    [key: string]: string | string[]
  }
  status: string
  message: string
}

const baseURL = appConfig.REALWORLD_API
const controller = new AbortController()
const CancelToken = axios.CancelToken
const source = CancelToken.source()

const realworldAPI: Readonly<AxiosInstance> = axios.create({
  baseURL: baseURL
})

const AuthInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const login = useLoginStore()

  if (login.user) {
    const accessToken = login.user.token

    if (accessToken) {
      config.headers.Authorization = `Token ${accessToken}`
      config.cancelToken = source.token
      config.signal = controller.signal
    }
  }
  return config
}

const OnResponseSuccess = (response: AxiosResponse): AxiosResponse => response

const OnResponseFailure = async (error: AxiosError<ResponseErrors>): Promise<ResponseErrors> => {
  const httpStatus = error.response?.status
  const login = useLoginStore()

  switch (httpStatus) {
    case HttpStatusCodes.UNAUTHORIZED:
      source.cancel()
      login.logout()
      break
    default:
      break
  }

  return Promise.reject(error)
}

realworldAPI.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
realworldAPI.interceptors.request.use(AuthInterceptor)
realworldAPI.interceptors.response.use(OnResponseSuccess, OnResponseFailure)

export default realworldAPI
