import * as React from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import ProTip from "@/components/ProTip"
import Copyright from "@/components/Copyright"
import prisma from "@/utils/prisma"

// 服务端组件直接查询数据库，示例：读取最新的 5 篇文章
export default async function Home() {
  const posts = await prisma.post.findMany({ take: 5 })
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js App Router example in TypeScript, {posts.length}{" "}
          posts
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}
