import { useBreakpoints, useTitle } from '@vueuse/core'
import { merge } from 'lodash'
import type { DynamicDialogOptions } from 'primevue/dynamicdialogoptions'
import { useDialog as primevueUseDialog } from 'primevue/usedialog'
import { cn } from './utils'

export const breakpoints = useBreakpoints({
  default: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
})

export const webTitle = useTitle(null, { titleTemplate: '%s / X-RealWorld-Vue' })

export const useDialog = () => {
  const dialog = primevueUseDialog()

  const open = (content: any, options?: DynamicDialogOptions) => {
    const isMaximize = breakpoints.active().value == 'default'
    const defaultOptions: DynamicDialogOptions = {
      props: {
        modal: true,
        draggable: false
      }
    }

    const maximizableOption: DynamicDialogOptions = {
      props: {
        position: isMaximize ? 'center' : options?.props?.position,
        maximizable: isMaximize,
        pt: {
          root: {
            class: cn({
              'p-dialog-maximized !border-none': isMaximize,
              'w-[600px] max-w-[600px]': !isMaximize
            })
          },
          maximizableButton: {
            class: '!hidden'
          }
        }
      }
    }

    dialog.open(content, merge({}, defaultOptions, options, maximizableOption))
  }

  return { open }
}
