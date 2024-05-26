import { ref } from 'vue'
import { defineStore } from 'pinia'
import { profileService, type Profile } from '@/libs/services/profileService'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<{ [username: string]: Profile }>({})
  const activeTab = ref<{ [key: string]: number }>({})

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

  const getActiveTab = (key: string) => {
    if (activeTab.value[key]) {
      return activeTab.value[key]
    }

    activeTab.value[key] = 0

    return activeTab.value[key]
  }

  return {
    profile,
    activeTab,
    mergeProfile,
    getProfile,
    getActiveTab
  }
})
