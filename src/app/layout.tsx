import * as React from "react"
import { ReactNode } from "react"

import { Metadata } from "next"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { Roboto } from "next/font/google"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { theme } from "@/app/theme"
import Sidebar from "@/components/ui/Sidebar/Sidebar"

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
})

export const metadata: Metadata = {
    title: "Homeowner Association Management",
    description: "Website to manage and process Homeowner Association",
}


export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
    const { children } = props

    return (
        <html lang="en" className={roboto.variable}>
        <body className={roboto.variable}>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Sidebar>
                    {children}
                </Sidebar>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    )
}
