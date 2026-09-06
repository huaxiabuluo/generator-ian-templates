import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 覆盖 eslint-config-next 的默认忽略配置。
  globalIgnores([
    // eslint-config-next 的默认忽略项：

    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Prisma 生成的客户端代码
    "src/generated/**",
  ]),
])

export default eslintConfig
