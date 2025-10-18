export type LanguageCode = 'es' | 'en'

export const availableLanguages: LanguageCode[] = ['en', 'es']

export type Flag = {
  name: string
  icon: string
  value: LanguageCode
}
