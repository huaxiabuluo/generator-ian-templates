# generator-ian-templates

基于 [Yeoman](https://yeoman.io/learning/index.html) 的项目脚手架，提供一组适配 AI Agent 迭代的前端模板：统一使用 pnpm 管理依赖，内置 ESLint 与 Prettier，并附带 AGENTS.md / CLAUDE.md 约定。

## 使用

```shell
npx -p yo -p generator-ian-templates -c 'yo ian-templates'
```

## 模板列表

| 模板                                  | 说明                                            |
| ------------------------------------- | ----------------------------------------------- |
| Nextjs + MUI + TypeScript             | Next.js App Router + MUI + TypeScript 前端项目   |
| Nextjs + MUI + Prisma                 | Next.js + MUI + Prisma 7（SQLite）全栈项目       |
| Nextjs + Tailwind + shadcn            | Next.js App Router + Tailwind CSS v4 + shadcn/ui |
| Vite + React + TypeScript + Antd      | Vite + React 19 + Ant Design + MobX + Less       |
| Vite + React + Tailwind + TypeScript  | Vite + React 19 + Tailwind CSS v4 + Ant Design   |
| Vite + MUI + TypeScript               | Vite + React 19 + MUI + MobX + i18n              |
| React 组件库（NPM Package）           | Babel + Rollup 构建，输出 CommonJS / ESM / UMD   |

所有模板生成的项目均：

- 使用 pnpm 管理依赖（`packageManager` 字段固定 pnpm 版本）
- 内置 ESLint（扁平配置）与 Prettier，提供 `lint` / `format` / `typecheck` 脚本
- 附带 `AGENTS.md` 与 `CLAUDE.md`，约定中文提交规范与文档语言，便于 AI Agent 参与迭代
- 提供中文 README，包含环境要求、快速开始与目录结构说明

## 开发

模板位于 `generators/app/templates/` 目录，生成器注册表在 `generators/app/index.mjs`。修改模板后可通过生成器本地跑一遍进行验证。
