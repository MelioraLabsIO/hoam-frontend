"use client"

import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter"
import type { ReactNode } from "react"
import theme from "./theme"

/** Emotion cache for the App Router, the HOAM theme and the CSS baseline. */
export default function ThemeRegistry({ children }: { children: ReactNode }) {
    return (
        <AppRouterCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={theme} defaultMode="system">
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}
