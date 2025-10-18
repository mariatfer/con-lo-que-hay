import { ICONS } from '@/constants/icons'
import type { Flag } from '@/types/language'

export const LANGUAGE = 'language'

export const FLAGS: Flag[] = [
  {
    name: 'English',
    icon: ICONS.england,
    value: 'en',
  },
  {
    name: 'Español',
    icon: ICONS.spain,
    value: 'es',
  },
]
