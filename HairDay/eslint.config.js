import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import * as importPlugin from 'eslint-plugin-import';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'import': importPlugin,
    },
    rules: {
      'template-curly-spacing': 'off',
      'quote-props': ['error', 'consistent'],
      'no-use-before-define': ['error', { 'functions': false, 'classes': true, 'variables': false }],
      'vue/v-on-style': ['error', 'longform'],
      'vue/v-bind-style': ['error', 'longform'],
      'vue/no-v-html': 'off',
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/html-indent': ['error', 2, { 'alignAttributesVertically': true }],
      'vue/no-deprecated-router-link-tag-prop': ['error', { 'components': ['RouterLink'] }],
      'prefer-destructuring': ['error', { 'object': false, 'array': false }],
      'vue/require-v-for-key': 'off',
      'vue/no-mutating-props': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/no-useless-template-attributes': 'off',
      'vue/no-side-effects-in-computed-properties': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/max-attributes-per-line': ['error', {
        'singleline': 2,
        'multiline': { 'max': 1 },
      }],
      'vue/no-v-for-template-key': 'off',
      'indent': ['error', 2, { ignoredNodes: ['TemplateLiteral'] }],
      'no-unsafe-optional-chaining': 'off',
      'function-paren-newline': 'off',
      'function-call-argument-newline': 'off',
      'no-promise-executor-return': 'off',
      'object-curly-newline': ['error', {
        'ObjectExpression': { 'multiline': true },
        'ObjectPattern': { 'multiline': true },
        'ImportDeclaration': { 'multiline': true },
        'ExportDeclaration': { 'multiline': true },
      }],
      'import/first': 'off',
      'import/no-unresolved': 'off',
    },
  },
  skipFormatting,
])
