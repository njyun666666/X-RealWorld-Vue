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
    return realworldAPI.get<ProfileViewModel>(`/api/profiles/${username}`).then((res) => {
      res.data.profile.bio = (res.data.profile.bio ?? '').replace(/\\n/g, '\n')
      return res
    })
  }

  toggleFollow(username: string, following: boolean) {
    if (following) {
      return this.follow(username)
    }

    return this.unfollow(username)
  }

  follow(username: string) {
    return realworldAPI.post<ProfileViewModel>(`/api/profiles/${username}/follow`).then((res) => {
      res.data.profile.bio = (res.data.profile.bio ?? '').replace(/\\n/g, '\n')
      return res
    })
  }

  unfollow(username: string) {
    return realworldAPI.delete<ProfileViewModel>(`/api/profiles/${username}/follow`).then((res) => {
      res.data.profile.bio = (res.data.profile.bio ?? '').replace(/\\n/g, '\n')
      return res
    })
  }
}
export const profileService = new ProfileService()
