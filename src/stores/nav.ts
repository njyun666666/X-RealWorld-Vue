import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useNavStore = defineStore('nav', () => {
  const navDefaultExpanded = useStorage('navDefaultExpanded', true)
  const navExpandedState = ref(false)
  const navMobileOpenState = ref(false)

  return {
    navDefaultExpanded,
    navExpandedState,
    navMobileOpenState
  }
})
