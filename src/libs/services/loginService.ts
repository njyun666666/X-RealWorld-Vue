import realworldAPI from '../api/realworldAPI'

export interface UsersLoginModel {
  user: User
}

export interface User {
  email: string
  password: string
}

export interface UsersLoginViewModel {
  user: UserViewModel
}

export interface UserViewModel {
  email: string
  token: string
  username: string
  bio: string
  image: null
}

class LoginService {
  login(data: UsersLoginModel) {
    return realworldAPI.post<UsersLoginViewModel>('/api/users/login', data)
  }
}

export const loginService = new LoginService()
