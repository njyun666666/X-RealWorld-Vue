import type { RoleType } from '@/appConst'
import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    title?: string
    roles?: RoleType[]
    keepAlive?: boolean
    noScrolling?: boolean
    needWait?: boolean
    resolveScroll?: () => void
  }
}
