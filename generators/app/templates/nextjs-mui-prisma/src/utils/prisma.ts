import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "@/generated/prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

// Prisma 7 必须通过 driver adapter 实例化客户端，SQLite 使用 better-sqlite3 适配器
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
})

const prisma = global.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV === "development") global.prisma = prisma

export default prisma
