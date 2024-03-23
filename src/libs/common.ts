import { useBreakpoints } from '@vueuse/core'

export type BreakpointType = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'default'
export const breakpoints = useBreakpoints({
  default: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
})
