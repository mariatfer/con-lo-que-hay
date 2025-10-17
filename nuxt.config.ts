// https://nuxt.com/docs/api/configuration/nuxt-config
import i18nConfig from './config/i18n'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxtjs/i18n',
  ],
  css: [
    '@/assets/variables.css',
    '@/assets/reset.scss',
    '@/assets/fonts.css',
    '@/assets/vueTransitions.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "assets/mixin.scss" as *;',
        },
      },
    },
  },
  i18n: {
    ...i18nConfig,
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'es',
      redirectOn: 'root',
    },
  },
  app: {
    head: {
      script: [{ src: 'https://js.puter.com/v2/', defer: true }],
    },
  },
})
