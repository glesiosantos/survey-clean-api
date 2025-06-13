import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 2021,
      },
    },
    rules: {
        'prettier/prettier': ['error', {semi: false, singleQuote: true, trailingComma: 'none'}],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-magic-numbers': 'off',
        'indent': 'off',
        'space-before-function-paren': 'off',
    }
  },
]
