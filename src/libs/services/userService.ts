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
  readonly loginUrl = '/api/users/login'
  readonly registrationUrl = '/api/users'
  readonly updateUrl = '/api/user'
  readonly authenticationUrl = '/api/user'

  login(data: UsersLoginModel) {
    return realworldAPI.post<UsersLoginViewModel>(this.loginUrl, data)
  }

  registration(data: UsersRegistrationModel) {
    return realworldAPI.post<UsersLoginViewModel>(this.registrationUrl, data)
  }

  update(data: UserUpdateModel) {
    return realworldAPI.put<UsersLoginViewModel>(this.updateUrl, data)
  }

  authentication() {
    return realworldAPI.get<UsersLoginViewModel>(this.authenticationUrl)
  }
}

export const userService = new UserService()
