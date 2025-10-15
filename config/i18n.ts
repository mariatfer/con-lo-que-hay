import type { ModuleOptions } from '@nuxtjs/i18n'

export default {
  lazy: true,
  defaultLocale: 'es',
  locales: [{ code: 'es', file: '../../locales/es.json', language: 'es' }],
  strategy: 'prefix_except_default',
} as Partial<ModuleOptions>
