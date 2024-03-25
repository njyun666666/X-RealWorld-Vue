import pmAPI from '../api/pmAPI'
import { useLoginStore } from '@/stores/login'

export interface LoginModel {
  email: string
  password: string
}

export interface LoginViewModel {
  access_token: 'string'
  refresh_token: 'string'
}

export interface RefreshTokenModel {
  refresh_token: 'string'
}

class LoginService {
  login(data: LoginModel) {
    return pmAPI.post<LoginViewModel>('/api/Login', data)
  }

  refresh() {
    const login = useLoginStore()
    return pmAPI
      .post<LoginViewModel>('/api/Login/RefreshToken', {
        refresh_token: login.refresh_token
      })
      .then(({ data }) => {
        login.setToken(data)
        return true
      })
      .catch(() => false)
  }
}

export const loginService = new LoginService()
