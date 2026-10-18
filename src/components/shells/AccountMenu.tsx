"use client"

import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import ColorModeToggle from "@/components/ColorModeToggle"
import { LogoutIcon } from "@/components/icons"
import { signOut } from "@/lib/auth/actions"

export default function AccountMenu({
    initials,
    name,
    detail,
}: {
    initials: string
    name: string
    detail: string
}) {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null)
    const open = Boolean(anchor)

    return (
        <>
            <IconButton
                color="inherit"
                aria-label={`Account, ${name}`}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={(e) => setAnchor(e.currentTarget)}
                sx={{ p: 0, borderRadius: "50%" }}
            >
                <Avatar component="span">{initials}</Avatar>
            </IconButton>
            <Menu
                anchorEl={anchor}
                open={open}
                onClose={() => setAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Stack sx={{ gap: 0.25, px: 1.25, pt: 1, pb: 1.25 }}>
                    <Typography sx={{ fontWeight: "fontWeightSemiBold" }}>{name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {detail}
                    </Typography>
                </Stack>
                <Stack sx={{ gap: 0.75, px: 1.25, pb: 1.25 }}>
                    <Typography variant="micro" color="text.secondary">
                        Theme
                    </Typography>
                    <ColorModeToggle fullWidth />
                </Stack>
                <Divider sx={{ mb: 0.5 }} />
                <form action={signOut}>
                    <MenuItem
                        component="button"
                        type="submit"
                        sx={{ width: 1, border: 0, bgcolor: "transparent" }}
                    >
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        Sign out
                    </MenuItem>
                </form>
            </Menu>
        </>
    )
}
