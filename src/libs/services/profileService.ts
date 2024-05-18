import realworldAPI from '../api/realworldAPI'

export interface ProfileViewModel {
  profile: Profile
}

export interface Profile {
  username: string
  bio: string
  image: string
  following: boolean
}

class ProfileService {
  getProfile(username: string) {
    return realworldAPI.get<ProfileViewModel>(`/api/profiles/${username}`)
  }

  toggleFollow(username: string, following: boolean) {
    if (following) {
      return this.follow(username)
    }

    return this.unfollow(username)
  }

  follow(username: string) {
    return realworldAPI.post<ProfileViewModel>(`/api/profiles/${username}/follow`)
  }

  unfollow(username: string) {
    return realworldAPI.delete<ProfileViewModel>(`/api/profiles/${username}/follow`)
  }
}
export const profileService = new ProfileService()
