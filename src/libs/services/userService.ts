import realworldAPI from '../api/realworldAPI'

export interface UsersLoginModel extends UserBase<User> {}
export interface UsersLoginViewModel extends UserBase<UserViewModel> {}
export interface UsersRegistrationModel extends UserBase<UserRegistration> {}
export interface UserUpdateModel extends UserBase<UserUpdate> {}

export interface UserBase<T> {
  user: T
}

export interface User {
  email: string
  password: string
}

export interface UserViewModel {
  email: string
  token: string
  username: string
  bio: string
  image: string
}

export interface UserRegistration {
  username: string
  email: string
  password: string
}

export interface UserUpdate {
  email: string
  bio: string
  image: string
}

class UserService {
  login(data: UsersLoginModel) {
    return realworldAPI.post<UsersLoginViewModel>('/api/users/login', data)
  }

  registration(data: UsersRegistrationModel) {
    return realworldAPI.post<UsersLoginViewModel>('/api/users', data)
  }

  update(data: UserUpdateModel) {
    return realworldAPI.put<UsersLoginViewModel>('/api/user', data)
  }

  authentication() {
    return realworldAPI.get<UsersLoginViewModel>('/api/user')
  }
}

export const userService = new UserService()
