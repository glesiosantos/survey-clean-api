import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'

export default [
  {
    ignores: ['node_modules', 'dist']
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      import: importPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 2021
      }
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts']
        }
      }
    },
    rules: {
      indent: 'off',
      '@typescript-eslint/indent': 'off',
      'import/extensions': ['error', 'always', { ts: 'always', js: 'always' }],
      'prettier/prettier': ['error', {
        semi: false,
        singleQuote: true,
        trailingComma: 'none',
        tabWidth: 2,
        useTabs: false
      }],
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-magic-numbers': 'off'
    }
  },
  // ✅ Regra especial para arquivos de teste
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
]
