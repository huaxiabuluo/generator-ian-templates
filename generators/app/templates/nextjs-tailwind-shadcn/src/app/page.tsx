import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-4" />
            Next.js + Tailwind CSS + shadcn/ui
          </CardTitle>
          <CardDescription>内置 ESLint 与 Prettier 的起始模板</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            编辑{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              src/app/page.tsx
            </code>{" "}
            开始开发，执行{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              pnpm dlx shadcn@latest add
            </code>{" "}
            可添加更多组件。
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link
                href="https://ui.shadcn.com/docs"
                target="_blank"
                rel="noreferrer"
              >
                shadcn/ui 文档
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noreferrer"
              >
                Next.js 文档
              </Link>
            </Button>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            （按 <kbd>d</kbd> 键切换暗色模式）
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
