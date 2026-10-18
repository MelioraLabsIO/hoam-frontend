"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { ReactNode } from "react"
import ColorModeToggle from "@/components/ColorModeToggle"
import {
    AlertCircleIcon,
    CheckIcon,
    MailIcon,
    ShieldIcon,
} from "@/components/icons"
import { BrandMark, IconTile } from "@/components/ui"

export const COMMUNITY = "Willow Creek"

/** Centered card layout shared by the password and two-factor screens. */
export function AuthLayout({
    children,
    footer,
    size = "sm",
    brandLink = true,
}: {
    children: ReactNode
    footer?: ReactNode
    size?: "sm" | "md" | "lg"
    brandLink?: boolean
}) {
    const brand = (
        <>
            <BrandMark />
            <Typography variant="brandLg" component="span">
                {COMMUNITY}
            </Typography>
        </>
    )
    const brandSx = {
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        color: "text.primary",
        displayPrint: "none",
    }
    return (
        <Box
            sx={(theme) => ({
                minHeight: "100vh",
                bgcolor: "background.default",
                px: 2,
                py: theme.layout.authPagePadding,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3.5,
                position: "relative",
            })}
        >
            <Box
                sx={{
                    position: { xs: "static", sm: "absolute" },
                    top: (theme) => theme.spacing(2),
                    right: (theme) => theme.spacing(2),
                    displayPrint: "none",
                }}
            >
                <ColorModeToggle />
            </Box>
            {brandLink ? (
                <Link
                    href="/auth/login"
                    sx={{ ...brandSx, "&:hover": { color: "text.primary" } }}
                >
                    {brand}
                </Link>
            ) : (
                <Box sx={brandSx}>{brand}</Box>
            )}
            <Paper
                component="main"
                variant="outlined"
                sx={(theme) => ({
                    width: 1,
                    maxWidth: theme.layout.authCard[size],
                    borderRadius: `${theme.radius.panel}px`,
                    p: theme.layout.authCardPadding,
                    display: "flex",
                    flexDirection: "column",
                    gap: size === "lg" ? 2.75 : 2.5,
                    "& > *": { minWidth: 0 },
                })}
            >
                {children}
            </Paper>
            {footer && (
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={(theme) => ({
                        maxWidth: theme.layout.authCard.sm,
                        textAlign: "center",
                        lineHeight: 1.5,
                        displayPrint: "none",
                    })}
                >
                    {footer}
                </Typography>
            )}
        </Box>
    )
}

export function AuthHeader({
    title,
    children,
    variant = "h2",
}: {
    title: ReactNode
    children?: ReactNode
    variant?: "h1" | "h2"
}) {
    return (
        <Stack sx={{ gap: 1 }}>
            <Typography variant={variant} component="h1">
                {title}
            </Typography>
            {children && (
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ "& strong": { color: "text.primary" } }}
                >
                    {children}
                </Typography>
            )}
        </Stack>
    )
}

export function AuthAlert({ children }: { children: ReactNode }) {
    return (
        <Alert
            severity="error"
            icon={<AlertCircleIcon fontSize="small" />}
            role="alert"
        >
            {children}
        </Alert>
    )
}

export function AuthIcon({ kind }: { kind: "mail" | "check" | "shield" }) {
    return (
        <IconTile>
            {kind === "mail" && <MailIcon fontSize="large" strokeWidth={1.8} />}
            {kind === "check" && <CheckIcon fontSize="large" strokeWidth={2.2} />}
            {kind === "shield" && <ShieldIcon fontSize="large" strokeWidth={1.8} />}
        </IconTile>
    )
}

/** Grey note block, e.g. the demo-mode explanation. */
export function AuthNote({ children }: { children: ReactNode }) {
    return (
        <Alert
            color="neutral"
            role="note"
            sx={{ lineHeight: 1.5, "& strong": { color: "text.primary" } }}
        >
            {children}
        </Alert>
    )
}

/** Shown on every auth screen while no Supabase project is connected. */
export function DemoNotice({ children }: { children: ReactNode }) {
    return (
        <AuthNote>
            <strong>Demo mode.</strong> {children}
        </AuthNote>
    )
}
