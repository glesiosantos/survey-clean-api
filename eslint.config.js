import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'

/** @type {import('eslint').FlatConfig[]} */
export default [
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 2021
      },
      globals: {
        NodeJS: 'readonly'
      },
      plugins: {
        '@typescript-eslint': tsPlugin,
        prettier: prettierPlugin
      }
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: false, // aspas duplas
          trailingComma: 'none'
        }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/space-before-function-paren': ['error', 'always'],
      '@typescript-eslint/indent': ['error', 2]
    }
  }
]
