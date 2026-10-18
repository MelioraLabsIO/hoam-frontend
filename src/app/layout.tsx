import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Bricolage_Grotesque, Figtree } from "next/font/google"
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript"
import ThemeRegistry from "@/theme/ThemeRegistry"

const bricolage = Bricolage_Grotesque({
    subsets: ["latin"],
    weight: ["500", "700"],
    display: "swap",
    variable: "--font-bricolage",
})

const figtree = Figtree({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-figtree",
})

export const metadata: Metadata = {
    title: {
        default: "HOAM · Homeowner Association Management",
        template: "%s · HOAM",
    },
    description:
        "Run your homeowner association: dues, requests, violations, amenities and announcements.",
}

export default function RootLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${bricolage.variable} ${figtree.variable}`}
            suppressHydrationWarning
        >
            <body>
                <InitColorSchemeScript attribute="class" defaultMode="system" />
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    )
}
