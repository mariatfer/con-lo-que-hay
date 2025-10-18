import { storeToRefs } from 'pinia'
import { useLanguageStore } from '@/stores/language'
import type { PageType } from '@/types/pages'
import type { CommonComponentType } from '@/types/commonComponents'

type TranslationsType = PageType | CommonComponentType

const LOCALES_BASE_PATH = 'locales'

/**
 * Reactive loader for localized JSON data.
 *
 * @template T - Expected type of the JSON data.
 * @param translations - Name of the JSON file to load (without extension).
 * @returns A reactive ref containing the typed data.
 */
export function useLocales<T>(translations: TranslationsType) {
  let locale
  try {
    locale = useI18n().locale
  } catch {
    // Ignored on purpose
  }

  if (!locale) {
    const { language } = storeToRefs(useLanguageStore())
    locale = language
  }

  const data = ref<T>({} as T)

  const loadLocales = async () => {
    const localeModule: { default: T } = await import(
      `@/../${LOCALES_BASE_PATH}/${locale.value}/${translations}.json`
    )
    data.value = localeModule.default
  }

  watch(
    locale,
    () => {
      loadLocales()
    },
    { immediate: true },
  )

  return { data }
}
