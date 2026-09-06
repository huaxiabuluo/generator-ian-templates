import type { Theme as MUITheme } from "@mui/material"

declare module "@emotion/react" {
  // 使 @emotion/react 的 Theme 类型与 MUI 主题保持一致
  // https://mui.com/material-ui/customization/default-theme/
  export type Theme = MUITheme
}
