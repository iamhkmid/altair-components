import React from "react"
import { ThemeProvider } from "styled-components"
import { TTheme, TThemeCtxProps, TThemeCtxProviderProps } from "../types/ThemeCtxTypes"
import _ from "lodash"
import { colors } from "../data/colors"
import GlobalStyles from "./GlobalStyles"


const theme: TTheme = {
  colors,
  fontFamily: '"Poppins", sans-serif',
}

export const ThemeCtx = React.createContext<TThemeCtxProps>({ theme })

const ThemeCtxProvider: React.FC<TThemeCtxProviderProps> = ({ children, theme: userTheme }) => {
  const mergedTheme: TTheme = _.merge(theme, userTheme || {})
  return (
    <ThemeCtx.Provider value={{ theme: mergedTheme }}>
      <GlobalStyles theme={mergedTheme}/>
      <ThemeProvider theme={mergedTheme}>
        {children}
      </ThemeProvider>
    </ThemeCtx.Provider>
  )
}

export default ThemeCtxProvider