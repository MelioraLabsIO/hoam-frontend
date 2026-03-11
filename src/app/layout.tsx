"use client"

import * as React from "react"
import { ReactNode } from "react"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { Roboto } from "next/font/google"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { theme } from "@/app/theme"
import Sidebar from "@/components/ui/Sidebar/Sidebar"
import { usePathname } from "next/navigation"

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
})

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
    const { children } = props
    const pathname = usePathname()

    // Hide sidebar on the landing page (home)
    const isHomePage = pathname === "/"

    return (
        <html lang="en" className={roboto.variable}>
        <body className={roboto.variable}>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {isHomePage ? (
                    <main>{children}</main>
                ) : (
                    <Sidebar>
                        {children}
                    </Sidebar>
                )}
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    )
}
