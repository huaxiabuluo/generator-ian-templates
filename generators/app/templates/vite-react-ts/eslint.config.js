import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsEslintParser from '@typescript-eslint/parser';
import globals from "globals";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsEslintParser,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 函数类型可推断即可，返回声明非必须
      '@typescript-eslint/no-explicit-any': 'off', // 允许 any 类型
      '@typescript-eslint/no-empty-function': 'off', // 允许空函数
      'no-extra-boolean-cast': 'off', // 允许 !!item 判断
    }
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off', // js 文件中允许直接使用 commonjs 的 require 引入方式
    },
  },
];
