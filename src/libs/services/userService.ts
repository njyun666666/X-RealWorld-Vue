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

export interface UsersRegistrationModel {
  user: UserRegistrationModel
}

export interface UserRegistrationModel {
  username: string
  email: string
  password: string
}

class UserService {
  login(data: UsersLoginModel) {
    return realworldAPI.post<UsersLoginViewModel>('/api/users/login', data)
  }

  registration(data: UsersRegistrationModel) {
    return realworldAPI.post<UsersLoginViewModel>('/api/users', data)
  }
}

export const userService = new UserService()
