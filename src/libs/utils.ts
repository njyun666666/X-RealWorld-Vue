import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ResponseErrors } from './api/realworldAPI'
import { i18n } from '@/i18n/config'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const parseErrorMessage = ({ errors }: ResponseErrors) => {
  const { t } = i18n.global
  const result = {} as {
    [key: string]: string
  }

  Object.entries(errors).map(([key, items]) => {
    if (typeof items === 'string') {
      result[key] = t('message.' + items.replace(/ /g, '_'))
    } else {
      result[key] = items.map((item) => t('message.' + item.replace(/ /g, '_'))).join(', ')
    }
  })

  return result
}
