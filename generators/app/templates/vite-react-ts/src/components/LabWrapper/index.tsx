import { useEffect, useState, type ReactElement } from "react"
import { Spin } from "antd"

export default function LabWrapper({ children }: { children: ReactElement }) {
  const [loading, switchLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => switchLoading(false), 1000)
  }, [])
  return <Spin spinning={loading}>{children}</Spin>
}
