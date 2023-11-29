'use client'

import React, { useContext } from 'react'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@/theme";
import { SettingsContext } from "@/contexts/settings-context";

const ThemeProviderAdapter = ({children}: {children: React.ReactNode}) => {
  const { settings } = useContext(SettingsContext)
  
  return (
    <ThemeProvider theme={createTheme({
      direction: settings.direction,
      responsiveFontSizes: settings.responsiveFontSizes,
      mode: settings.theme,
    })}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  )
}

export default ThemeProviderAdapter