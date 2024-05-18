import { ref } from 'vue'
import { defineStore } from 'pinia'
import { profileService, type Profile } from '@/libs/services/profileService'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<{ [username: string]: Profile }>({})

  const mergeProfile = (data: Profile, oldUsername?: string) => {
    profile.value[data.username] = data

    if (oldUsername && profile.value[oldUsername]) {
      profile.value[oldUsername] = profile.value[data.username]
    }
  }

  const getProfile = async (username: string) => {
    const exists = profile.value[username]

    if (exists) {
      return exists
    }

    return await profileService.getProfile(username).then(async ({ data }) => {
      mergeProfile(data.profile)
      return profile.value[username]
    })
  }

  return {
    profile,
    mergeProfile,
    getProfile
  }
})
