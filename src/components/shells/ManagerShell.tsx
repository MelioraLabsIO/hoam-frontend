"use client"

import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { Theme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Link from "@mui/material/Link"
import { usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"
import ColorModeToggle from "@/components/ColorModeToggle"
import { LogoutIcon, MenuIcon, XIcon } from "@/components/icons"
import { BrandMark, Initials } from "@/components/ui"
import { signOut } from "@/lib/auth/actions"
import type { ShellUser } from "@/lib/auth/session"

const NAV = [
    { href: "/manager", label: "Overview" },
    { href: "/manager/residents", label: "Residents" },
    { href: "/manager/billing", label: "Dues & billing" },
    { href: "/manager/requests", label: "Requests", count: 7 },
    { href: "/manager/violations", label: "Violations" },
    { href: "/manager/amenities", label: "Amenities" },
    { href: "/manager/announcements", label: "Announcements" },
    { href: "/manager/documents", label: "Documents" },
]

const navItemSx = (theme: Theme) => ({
    minHeight: theme.layout.tapTarget,
    px: 1.5,
    borderRadius: `${theme.radius.sm}px`,
    justifyContent: "space-between",
    color: "nav.text",
    ...theme.typography.body1,
    fontWeight: theme.typography.fontWeightMedium,
    "&:hover": { bgcolor: "nav.hover", color: "nav.contrastText" },
    "&.Mui-selected, &.Mui-selected:hover": {
        bgcolor: "nav.active",
        color: "nav.contrastText",
        fontWeight: theme.typography.fontWeightSemiBold,
    },
})

export default function ManagerShell({
    user,
    children,
}: {
    user: ShellUser
    children: ReactNode
}) {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const compact = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down(theme.layout.navBreakpoint),
    )
    const showNav = !compact || open

    const isActive = (href: string) =>
        href === "/manager" ? pathname === href : pathname.startsWith(href)

    return (
        <Box
            sx={(theme) => ({
                minHeight: "100vh",
                display: "flex",
                bgcolor: "background.default",
                [theme.breakpoints.down(theme.layout.navBreakpoint)]: {
                    flexDirection: "column",
                },
            })}
        >
            <Box
                component="aside"
                sx={(theme) => ({
                    flex: `0 0 ${theme.layout.sidebarWidth}px`,
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    overflowY: "auto",
                    px: 2,
                    py: 3.5,
                    bgcolor: "nav.main",
                    color: "nav.softContrast",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3.5,
                    [theme.breakpoints.down(theme.layout.navBreakpoint)]: {
                        position: "static",
                        height: "auto",
                        flex: "0 0 auto",
                        py: 1.75,
                        gap: open ? 1.5 : 0,
                    },
                })}
            >
                <Stack
                    direction="row"
                    sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                    <Link
                        href="/manager"
                        color="inherit"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.25,
                            px: 1,
                            "&:hover": { color: "inherit" },
                        }}
                    >
                        <BrandMark />
                        <Stack>
                            <Typography variant="brand" color="nav.contrastText">
                                Willow Creek
                            </Typography>
                            <Typography variant="caption" color="nav.sub">
                                HOA Manager
                            </Typography>
                        </Stack>
                    </Link>
                    {compact && (
                        <IconButton
                            color="nav"
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            onClick={() => setOpen((o) => !o)}
                        >
                            {open ? <XIcon /> : <MenuIcon />}
                        </IconButton>
                    )}
                </Stack>

                <Collapse
                    in={showNav}
                    timeout={compact ? "auto" : 0}
                    sx={{
                        flex: compact ? "0 0 auto" : "1 1 auto",
                        "& .MuiCollapse-wrapper, & .MuiCollapse-wrapperInner": {
                            height: compact ? "auto" : 1,
                        },
                    }}
                >
                    <Stack sx={{ height: 1, gap: 3.5 }}>
                        <List
                            component="nav"
                            aria-label="Manager"
                            disablePadding
                            sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}
                        >
                            {NAV.map((item) => {
                                const active = isActive(item.href)
                                return (
                                    <ListItemButton
                                        key={item.href}
                                        href={item.href}
                                        selected={active}
                                        aria-current={active ? "page" : undefined}
                                        onClick={() => setOpen(false)}
                                        sx={navItemSx}
                                    >
                                        {item.label}
                                        {item.count !== undefined && (
                                            <Chip
                                                component="span"
                                                label={item.count}
                                                color="nav"
                                                variant="filled"
                                            />
                                        )}
                                    </ListItemButton>
                                )
                            })}
                        </List>

                        <Stack
                            sx={{
                                mt: "auto",
                                gap: 0.25,
                                pt: 2,
                                borderTop: 1,
                                borderColor: "nav.active",
                            }}
                        >
                            <Stack
                                direction="row"
                                sx={{ alignItems: "center", gap: 1.25, px: 1.5, pt: 1, pb: 1.25, minWidth: 0 }}
                            >
                                <Initials soft>{user.initials}</Initials>
                                <ListItemText
                                    primary={user.name}
                                    secondary={user.detail}
                                    slotProps={{
                                        primary: {
                                            variant: "body2",
                                            color: "nav.contrastText",
                                        },
                                        secondary: { color: "nav.sub", noWrap: true },
                                    }}
                                    sx={{ minWidth: 0 }}
                                />
                            </Stack>
                            <Box sx={{ px: 1.5, pb: 1 }}>
                                <ColorModeToggle fullWidth onDark />
                            </Box>
                            <form action={signOut}>
                                <ListItemButton
                                    component="button"
                                    type="submit"
                                    sx={[
                                        navItemSx,
                                        {
                                            width: 1,
                                            border: 0,
                                            bgcolor: "transparent",
                                            justifyContent: "flex-start",
                                            gap: 1.25,
                                        },
                                    ]}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    Sign out
                                </ListItemButton>
                            </form>
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>
            <Box
                component="main"
                sx={(theme) => ({
                    flex: "1 1 auto",
                    minWidth: 0,
                    pt: 4,
                    pb: 6,
                    px: theme.layout.gutter,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    "& > *": { minWidth: 0 },
                })}
            >
                {children}
            </Box>
        </Box>
    )
}
