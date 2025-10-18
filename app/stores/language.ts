import { defineStore, acceptHMRUpdate } from 'pinia'
import type { LanguageCode } from '@/types/language'
import { LANGUAGE, FLAGS } from '@/constants/language'

const DEFAULT_LANGUAGE: LanguageCode = 'es'

export const isValidLanguage = (lang: unknown): lang is LanguageCode => {
  const validLanguages = FLAGS.map((flag) => flag.value)
  return typeof lang === 'string' && validLanguages.includes(lang as LanguageCode)
}

export const useLanguageStore = defineStore('language', () => {
  const language = ref<LanguageCode>(DEFAULT_LANGUAGE)
  const isReady = ref(false)

  watch(language, (newLang) => {
    localStorage.setItem(LANGUAGE, newLang)
  })

  const getLanguage = computed(() => language.value)

  const currentLanguageInfo = computed(() => {
    return FLAGS.find((flag) => flag.value === language.value)
  })

  const initLanguage = () => {
    const saved = localStorage.getItem(LANGUAGE)
    if (isValidLanguage(saved)) {
      language.value = saved
    }
    isReady.value = true
  }

  const setLanguage = (lang: LanguageCode) => {
    language.value = lang
  }

  const toggleLanguage = () => {
    const newLang: LanguageCode = language.value === 'es' ? 'en' : 'es'
    setLanguage(newLang)
  }

  return {
    language,
    getLanguage,
    currentLanguageInfo,
    setLanguage,
    toggleLanguage,
    isReady,
    initLanguage,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLanguageStore, import.meta.hot))
}
