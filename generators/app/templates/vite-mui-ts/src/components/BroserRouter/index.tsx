import { useEffect, type ReactNode } from "react"
import {
  BrowserRouter as ReactRouterBrowserRouter,
  useLocation,
} from "react-router-dom"
import { useStore } from "@/stores"

/**
 * 将 react-router 的当前路由同步到 MobX RouterStore，
 * 使非组件代码也能读取当前 location。
 */
function RouterStoreSync() {
  const location = useLocation()
  const { routerStore } = useStore()

  useEffect(() => {
    routerStore.updateLocation(location)
  }, [location, routerStore])

  return null
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  return (
    <ReactRouterBrowserRouter>
      <RouterStoreSync />
      {children}
    </ReactRouterBrowserRouter>
  )
}
