
import 'styled-components';

declare module "styled-components" {
  export interface DefaultTheme extends TTheme { }
}

export type TThemeCtxProps = {
  theme?: TTheme,
}

export type TThemeCtxProviderProps = {
  children: React.ReactNode
  theme?: TTheme
}

export type TDefaultColorPallet = {
  "50"?: string
  "100"?: string
  "200"?: string
  "300"?: string
  "400"?: string
  "500"?: string
  "600"?: string
  "700"?: string
  "800"?: string
  "900"?: string
}

export type TTheme = {
  colors?: {
    primary?: TDefaultColorPallet
    text?: TDefaultColorPallet
    blue?: TDefaultColorPallet
    red?: TDefaultColorPallet
    yellow?: TDefaultColorPallet
    gray?: TDefaultColorPallet
    green?: TDefaultColorPallet
    purple?: TDefaultColorPallet
  },
  fontFamily?: string
}