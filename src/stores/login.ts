import { computed } from 'vue'
import { defineStore } from 'pinia'
import { StorageSerializers, useStorage } from '@vueuse/core'
import type { UserViewModel } from '@/libs/services/userService'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
// import type { RoleType } from '@/appConst'

export const useLoginStore = defineStore('login', () => {
  const user = useStorage<UserViewModel>('user', null, localStorage, {
    serializer: StorageSerializers.object
  })

  const loginState = computed(() => tokenPayload.value !== undefined)

  const setUser = (data: UserViewModel) => {
    user.value = data
  }

  const logout = () => {
    user.value = null
  }

  const tokenPayload = computed(() => {
    try {
      if (user.value) {
        return jwtDecode(user.value.token) as JwtPayload
      }
    } catch (error) {
      return undefined
    }

    return undefined
  })

  // const checkRole = (roles?: RoleType[]) => {
  //   if (!roles) return true

  //   const length = roles.length

  //   for (let i = 0; i < length; i++) {
  //     if (tokenPayload.value?.role.includes(roles[i])) {
  //       return true
  //     }
  //   }

  //   return false
  // }

  return {
    user,
    loginState,
    setUser,
    logout,
    tokenPayload
  }
})
