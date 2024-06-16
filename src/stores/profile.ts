import { ref } from 'vue'
import { defineStore } from 'pinia'
import { profileService, type Profile } from '@/libs/services/profileService'
import type { ArticleTabType } from './article'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<{ [username: string]: Profile }>({})
  const activeTab = ref<{ [key: string]: ArticleTabType }>({})

  const reset = () => {
    profile.value = {}
    activeTab.value = {}
  }

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

    activeTab.value[key] = 'profilePosts'

    return activeTab.value[key]
  }

  return {
    profile,
    activeTab,
    mergeProfile,
    getProfile,
    getActiveTab,
    reset
  }
})
