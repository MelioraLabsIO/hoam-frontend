"use client"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { ChevronDown } from "@/components/icons"
import { BrandMark, CountDot, Pill } from "@/components/ui"
import type { ShellUser } from "@/lib/auth/session"
import { accentScope } from "@/theme/accent"
import AccountMenu from "./AccountMenu"

type NavItem = { href: string; label: string; count?: number }

const PORTALS = {
    owner: {
        label: "Owner",
        tone: "blue" as const,
        home: "/owner",
        nav: [
            { href: "/owner", label: "Home" },
            { href: "/owner/dues", label: "Dues" },
            { href: "/owner/requests", label: "Requests" },
            { href: "/owner/violations", label: "Violations", count: 1 },
            { href: "/owner/amenities", label: "Amenities" },
            { href: "/owner/documents", label: "Documents" },
            { href: "/owner/homes", label: "My homes & tenants" },
        ] as NavItem[],
    },
    tenant: {
        label: "Tenant",
        tone: "teal" as const,
        home: "/tenant",
        nav: [
            { href: "/tenant", label: "Home" },
            { href: "/tenant/maintenance", label: "Maintenance" },
            { href: "/tenant/amenities", label: "Amenities" },
            { href: "/tenant/rules", label: "Community rules" },
            { href: "/tenant/household", label: "My household" },
        ] as NavItem[],
    },
}

export default function PortalShell({
    portal,
    user,
    children,
}: {
    portal: keyof typeof PORTALS
    user: ShellUser
    children: ReactNode
}) {
    const pathname = usePathname()
    const cfg = PORTALS[portal]
    const isActive = (href: string) =>
        href === cfg.home ? pathname === href : pathname.startsWith(href)
    const current = cfg.nav.find((item) => isActive(item.href))?.href ?? false

    return (
        <Box
            sx={[
                { minHeight: "100vh", bgcolor: "background.default" },
                portal === "tenant" ? accentScope("teal") : {},
            ]}
        >
            <AppBar component="header">
                <Container
                    maxWidth={false}
                    sx={(theme) => ({
                        maxWidth: theme.layout.contentMaxWidth,
                        px: `${theme.layout.gutter} !important`,
                        pt: 1.75,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    })}
                >
                    <Stack
                        direction="row"
                        sx={{
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1.5,
                        }}
                    >
                        <Link
                            href={cfg.home}
                            color="text.primary"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.25,
                                "&:hover": { color: "text.primary" },
                            }}
                        >
                            <BrandMark />
                            <Typography variant="brand" component="span">
                                Willow Creek
                            </Typography>
                            <Pill tone={cfg.tone}>
                                <Box component="span" sx={{ fontWeight: "fontWeightBold" }}>
                                    {cfg.label}
                                </Box>
                            </Pill>
                        </Link>
                        <Stack direction="row" sx={{ alignItems: "center", gap: 1.25 }}>
                            {portal === "owner" ? (
                                <Button
                                    size="small"
                                    aria-label="Switch home, 14 Willow Bend Ct selected"
                                    endIcon={<ChevronDown fontSize="xsmall" />}
                                >
                                    14 Willow Bend Ct
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontWeight: "fontWeightMedium" }}
                                    >
                                        · 2 homes
                                    </Typography>
                                </Button>
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: "fontWeightSemiBold" }}
                                >
                                    9 Heron Way
                                </Typography>
                            )}
                            <AccountMenu {...user} />
                        </Stack>
                    </Stack>
                    <Tabs
                        component="nav"
                        aria-label={cfg.label}
                        value={current}
                        variant="scrollable"
                        scrollButtons={false}
                    >
                        {cfg.nav.map((item) => (
                            <Tab
                                key={item.href}
                                value={item.href}
                                href={item.href}
                                aria-current={isActive(item.href) ? "page" : undefined}
                                label={
                                    <Stack
                                        component="span"
                                        direction="row"
                                        sx={{ alignItems: "center", gap: 0.75 }}
                                    >
                                        {item.label}
                                        {item.count !== undefined && (
                                            <CountDot count={item.count} />
                                        )}
                                    </Stack>
                                }
                            />
                        ))}
                    </Tabs>
                </Container>
            </AppBar>
            <Container
                component="main"
                maxWidth={false}
                sx={(theme) => ({
                    maxWidth: theme.layout.contentMaxWidth,
                    px: `${theme.layout.gutter} !important`,
                    pt: 4,
                    pb: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    "& > *": { minWidth: 0 },
                })}
            >
                {children}
            </Container>
        </Box>
    )
}
