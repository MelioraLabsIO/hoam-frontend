"use client"

import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import Typography from "@mui/material/Typography"
import { useState, type ReactNode } from "react"
import { ListRow, Pill } from "@/components/ui"

type PermId = "book" | "maint" | "news" | "gate"

// Placeholder data until the Supabase tables exist.
const PERMS: { id: PermId; label: string; note: string }[] = [
    { id: "book", label: "Book amenities", note: "Clubhouse, courts and pool" },
    {
        id: "maint",
        label: "Submit maintenance requests",
        note: "You get a copy of each one",
    },
    {
        id: "news",
        label: "Get community announcements",
        note: "All-resident posts only",
    },
    {
        id: "gate",
        label: "Gate and pool access codes",
        note: "Shown in their portal",
    },
]

/** One home's card; two sit side by side and wrap under on narrow screens. */
export function HomeCard({ children }: { children: ReactNode }) {
    return (
        <Card
            component="section"
            sx={(theme) => ({
                flex: `1 1 ${theme.spacing(47.5)}`,
                p: 2.75,
                gap: 2,
            })}
        >
            {children}
        </Card>
    )
}

/** Address, lot line and status pill at the top of a home card. */
export function HomeHeader({
    address,
    detail,
    pill,
}: {
    address: string
    detail: string
    pill: ReactNode
}) {
    return (
        <Stack
            direction="row"
            sx={{
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 1,
            }}
        >
            <Stack sx={{ gap: 0.5 }}>
                <Typography variant="h3" component="h2">
                    {address}
                </Typography>
                <Typography variant="body2" component="span" color="text.secondary">
                    {detail}
                </Typography>
            </Stack>
            {pill}
        </Stack>
    )
}

export default function TenantAccess() {
    const [perms, setPerms] = useState<Record<PermId, boolean>>({
        book: true,
        maint: true,
        news: true,
        gate: false,
    })

    return (
        <HomeCard>
            <HomeHeader
                address="9 Heron Way"
                detail="Lot 12 · townhome"
                pill={
                    <Pill tone="teal">
                        <Typography
                            variant="inherit"
                            component="span"
                            sx={{ fontWeight: "fontWeightBold" }}
                        >
                            Rented
                        </Typography>
                    </Pill>
                }
            />

            <Stack
                direction="row"
                sx={(theme) => ({
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.75,
                    borderRadius: `${theme.radius.lg}px`,
                    bgcolor: "background.muted",
                })}
            >
                <Avatar
                    component="span"
                    aria-hidden="true"
                    sx={(theme) => ({
                        width: theme.layout.control.md,
                        height: theme.layout.control.md,
                        bgcolor: "teal.main",
                        color: "teal.contrastText",
                        fontSize: theme.typography.body1.fontSize,
                    })}
                >
                    JL
                </Avatar>
                <Stack sx={{ flex: "1 1 auto", minWidth: 0, gap: 0.25 }}>
                    <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{ fontWeight: "fontWeightSemiBold" }}
                    >
                        Jordan Lee
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Lease Aug 1, 2025 – Jul 31, 2027 · joined the tenant
                        portal
                    </Typography>
                </Stack>
            </Stack>

            <Stack sx={{ gap: 0.25 }}>
                <Typography
                    variant="body2"
                    component="h3"
                    sx={{ fontWeight: "fontWeightSemiBold", pb: 0.5 }}
                >
                    What Jordan can do
                </Typography>
                {PERMS.map((p) => (
                    <ListRow key={p.id} sx={{ py: 1.25 }}>
                        <Stack sx={{ flex: "1 1 auto", minWidth: 0, gap: 0.25 }}>
                            <Typography
                                component="span"
                                sx={{ fontWeight: "fontWeightSemiBold" }}
                            >
                                {p.label}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {p.note}
                            </Typography>
                        </Stack>
                        <Switch
                            color="teal"
                            checked={perms[p.id]}
                            onChange={(e) =>
                                setPerms({ ...perms, [p.id]: e.target.checked })
                            }
                            slotProps={{ input: { "aria-label": p.label } }}
                        />
                    </ListRow>
                ))}
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ pt: 1 }}
                >
                    Dues, violations and votes always stay with you. Tenants
                    never see them.
                </Typography>
            </Stack>

            <Stack
                direction="row"
                sx={{ flexWrap: "wrap", alignItems: "center", gap: 1.25 }}
            >
                <Button
                    sx={(theme) => ({ flex: `1 1 ${theme.spacing(17.5)}` })}
                >
                    Upload lease
                </Button>
                <Button
                    sx={(theme) => ({
                        flex: `1 1 ${theme.spacing(17.5)}`,
                        color: "amber.dark",
                    })}
                >
                    End tenancy
                </Button>
            </Stack>
        </HomeCard>
    )
}
