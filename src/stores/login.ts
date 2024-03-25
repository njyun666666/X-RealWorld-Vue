import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { LoginViewModel } from '@/libs/services/loginService'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import type { RoleType } from '@/appConst'

interface UserPayload extends JwtPayload {
  uid: string
  role: string | string[]
  photoURL?: string
}

export const useLoginStore = defineStore('login', () => {
  const access_token = useStorage<string>('access_token', null)
  const refresh_token = useStorage<string>('refresh_token', null)
  const loginState = computed(() => payload.value !== undefined)

  const setToken = (data: LoginViewModel) => {
    access_token.value = data.access_token
    refresh_token.value = data.refresh_token
  }

  const logout = () => {
    access_token.value = null
    refresh_token.value = null
  }

  const payload = computed(() => {
    try {
      if (access_token.value) {
        return jwtDecode(access_token.value) as UserPayload
      }
    } catch (error) {
      return undefined
    }

    return undefined
  })

  const checkRole = (roles?: RoleType[]) => {
    if (!roles) return true

    const length = roles.length

    for (let i = 0; i < length; i++) {
      if (payload.value?.role.includes(roles[i])) {
        return true
      }
    }

    return false
  }

  return {
    access_token,
    refresh_token,
    loginState,
    setToken,
    logout,
    payload,
    checkRole
  }
})
