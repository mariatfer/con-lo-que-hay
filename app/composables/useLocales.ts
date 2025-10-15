import type { PAGES } from '@/constants/pages'
import type { COMMON_COMPONENTS } from '@/constants/commonComponents'

type PageType = (typeof PAGES)[number]
type CommonComponentType = (typeof COMMON_COMPONENTS)[number]

type TranslationsType = PageType | CommonComponentType

const LOCALES_BASE_PATH = 'locales'
const LANGUAGE = 'es'

/**
 * Loads localized data for a page or common component.
 *
 * @template T - The expected type of the JSON data.
 * @param translations - The name of the JSON file to load (without extension).
 * @returns An object containing the typed data.
 */
export async function useLocales<T>(translations: TranslationsType) {
  const localeModule: { default: T } = await import(
    `@/../${LOCALES_BASE_PATH}/${LANGUAGE}/${translations}.json`
  )
  const data = localeModule.default

  return { data }
}
