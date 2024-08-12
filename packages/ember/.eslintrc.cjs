'use strict';

module.exports = {
  settings: {
    'import/resolver': 'webpack',
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['ember', 'import', 'decorator-position'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
    'plugin:decorator-position/ember',
  ],
  env: {
    browser: true,
  },
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external', 'internal', 'object'],
          ['parent', 'sibling', 'index'],
          'type',
        ],
        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
        },
      },
    ],
    'decorator-position/decorator-position': [
      'error',
      {
        methods: 'above',
        properties: 'above',
      },
    ],
  },
  overrides: [
    // ts files
    {
      files: ['**/*.ts', '**/*.gts'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        // Add any custom rules here
      },
    },
    // require relative imports use full extensions
    {
      files: ['src/**/*.{js,ts,gjs,gts}'],
      rules: {
        'import/extensions': ['error', 'always', { ignorePackages: true }],
      },
    },
    {
      files: ['**/*.gjs'],
      parser: 'ember-eslint-parser',
      plugins: ['ember'],
      extends: [
        'eslint:recommended',
        'plugin:ember/recommended',
        'plugin:ember/recommended-gjs',
      ],
    },
    {
      files: ['**/*.gts'],
      parser: 'ember-eslint-parser',
      plugins: ['ember'],
      extends: ['plugin:ember/recommended', 'plugin:ember/recommended-gts'],
    },
    // node files
    {
      files: [
        './.eslintrc.cjs',
        './.prettierrc.cjs',
        './.template-lintrc.cjs',
        './addon-main.cjs',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['n'],
      extends: ['plugin:n/recommended'],
    },
  ],
};
