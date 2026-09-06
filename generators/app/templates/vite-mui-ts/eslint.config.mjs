import { defineConfig, globalIgnores } from "eslint/config"
import js from "@eslint/js"
import tseslint from "typescript-eslint"
import prettier from "eslint-config-prettier"
import globals from "globals"

export default defineConfig([
  globalIgnores(["dist/", "build/", "node_modules/"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // 允许 any 类型
      "@typescript-eslint/no-explicit-any": "off",
      // 允许空函数
      "@typescript-eslint/no-empty-function": "off",
      // 允许 !!item 判断
      "no-extra-boolean-cast": "off",
    },
  },
])
