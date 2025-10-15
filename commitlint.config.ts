import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'assets',
        'components',
        'composables',
        'config',
        'constants',
        'core',
        'dependencies',
        'documentation',
        'interfaces',
        'layout',
        'locales',
        'middlewares',
        'mocks',
        'pages',
        'plugins',
        'public',
        'readme',
        'server',
        'services',
        'stores',
        'styles',
        'testing',
        'types',
        'utils',
      ],
    ],
  },
}

export default config
