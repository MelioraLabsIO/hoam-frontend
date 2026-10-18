"use client"

import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { ReactNode } from "react"
import { COMMUNITY } from "@/components/auth/AuthLayout"
import { BrandMark } from "@/components/ui"

const PAD = { xs: 3.5, md: 8 }

/** Two-column sign-in screen: dark marketing panel and the form column. */
export function SignInSplit({
    children,
    footer,
}: {
    children: ReactNode
    footer: ReactNode
}) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                bgcolor: "background.default",
            }}
        >
            <Box
                component="aside"
                sx={{
                    flex: { md: "42 1 0%" },
                    p: PAD,
                    bgcolor: "nav.main",
                    color: "nav.contrastText",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 5,
                }}
            >
                <Stack direction="row" sx={{ alignItems: "center", gap: 1.25 }}>
                    <BrandMark size="lg" />
                    <Typography variant="h4" component="span">
                        {COMMUNITY}
                    </Typography>
                </Stack>
                <Stack
                    sx={(theme) => ({
                        gap: 2,
                        maxWidth: theme.layout.authCard.sm,
                    })}
                >
                    <Typography variant="display" component="h2">
                        Your community, all in one place.
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        color="nav.text"
                        sx={{ fontWeight: "fontWeightRegular", lineHeight: 1.5 }}
                    >
                        Pay dues, book the clubhouse, follow your requests and
                        stay in the loop.
                    </Typography>
                </Stack>
                <Stack sx={{ gap: 1.25 }}>
                    <Stack
                        direction="row"
                        sx={{ flexWrap: "wrap", alignItems: "center", gap: 1 }}
                    >
                        <Chip color="nav" variant="soft" size="medium" label="HOA Manager" />
                        <Chip color="nav" variant="soft" size="medium" label="Owner" />
                        <Chip color="nav" variant="soft" size="medium" label="Tenant" />
                    </Stack>
                    <Typography variant="body2" color="nav.sub">
                        One sign-in for everyone. You&apos;ll land in the portal
                        that matches your account.
                    </Typography>
                </Stack>
            </Box>

            <Box
                component="main"
                sx={{
                    flex: { md: "52 1 0%" },
                    minWidth: 0,
                    py: PAD,
                    px: { xs: 2, md: 8 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3.5,
                }}
            >
                <Stack
                    sx={(theme) => ({
                        width: 1,
                        maxWidth: theme.spacing(52.5),
                        gap: 2.75,
                    })}
                >
                    {children}
                </Stack>
                {footer}
            </Box>
        </Box>
    )
}
