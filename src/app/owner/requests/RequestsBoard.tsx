"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"
import { useState, type FormEvent } from "react"
import { Pill, VisuallyHidden, type Tone } from "@/components/ui"

type Kind = "maint" | "arch"
type Req = {
    kind: Kind
    id: string
    home: string
    title: string
    status: string
    tone: Tone
    note: string
}

// Placeholder data until the Supabase tables exist.
const REQUESTS: Req[] = [
    {
        kind: "maint",
        id: "#1042",
        home: "14 Willow Bend Ct",
        title: "Streetlight out near mailbox cluster B",
        status: "Vendor booked",
        tone: "teal",
        note: "Scheduled Oct 17 · updated today",
    },
    {
        kind: "maint",
        id: "#1045",
        home: "9 Heron Way",
        title: "Sidewalk crack in front of driveway",
        status: "Under review",
        tone: "gray",
        note: "Submitted by your tenant Jordan Lee · you were copied",
    },
    {
        kind: "maint",
        id: "#1019",
        home: "14 Willow Bend Ct",
        title: "Sprinkler head broken by the pond path",
        status: "Resolved",
        tone: "blue",
        note: "Closed Sep 30",
    },
    {
        kind: "arch",
        id: "#1038",
        home: "14 Willow Bend Ct",
        title: "Replace front fence with 4 ft cedar",
        status: "Board vote Oct 24",
        tone: "gray",
        note: "2 photos and a site plan attached",
    },
    {
        kind: "arch",
        id: "#1012",
        home: "9 Heron Way",
        title: "Repaint shutters, Hale Navy",
        status: "Approved",
        tone: "blue",
        note: "Approved Aug 14 · valid for 6 months",
    },
]

const TABS: { id: Kind; label: string }[] = [
    { id: "maint", label: "Maintenance" },
    { id: "arch", label: "Architectural approvals" },
]

const HOME_OPTIONS = ["14 Willow Bend Ct", "9 Heron Way"]
const TYPE_OPTIONS = [
    "Maintenance (common area)",
    "Architectural change to my home",
]

export default function RequestsBoard() {
    const [tab, setTab] = useState<Kind>("maint")
    const [submitted, setSubmitted] = useState(false)
    const items = REQUESTS.filter((r) => r.kind === tab)

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSubmitted(true)
        e.currentTarget.reset()
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "flex-start",
            }}
        >
            <Stack
                component="section"
                aria-label="Your requests"
                sx={(theme) => ({
                    flex: `999 1 ${theme.layout.split.main}px`,
                    minWidth: 0,
                    gap: 1.5,
                })}
            >
                <ToggleButtonGroup
                    exclusive
                    aria-label="Request type"
                    value={tab}
                    onChange={(_, v: Kind | null) => v && setTab(v)}
                    sx={{ alignSelf: "flex-start" }}
                >
                    {TABS.map((t) => (
                        <ToggleButton
                            key={t.id}
                            value={t.id}
                            aria-controls="request-list"
                        >
                            {t.label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
                <Stack
                    id="request-list"
                    aria-label={TABS.find((t) => t.id === tab)?.label}
                    sx={{ gap: 1.5 }}
                >
                    {items.map((r) => (
                        <Card
                            key={r.id}
                            component="article"
                            sx={{ p: 2.25, gap: 1 }}
                        >
                            <Stack
                                direction="row"
                                sx={{
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ fontWeight: "fontWeightSemiBold" }}
                                >
                                    {r.id} · {r.home}
                                </Typography>
                                <Pill tone={r.tone}>{r.status}</Pill>
                            </Stack>
                            <Typography variant="h6" component="span">
                                {r.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                component="span"
                                color="text.secondary"
                            >
                                {r.note}
                            </Typography>
                        </Card>
                    ))}
                </Stack>
            </Stack>

            <Card
                component="section"
                aria-labelledby="new-h"
                sx={(theme) => ({
                    flex: `1 1 ${theme.spacing(42.5)}`,
                    p: 2.75,
                })}
            >
                <Typography id="new-h" variant="h4" component="h2">
                    New request
                </Typography>
                <Stack component="form" sx={{ gap: 1.75 }} onSubmit={onSubmit}>
                    <TextField
                        select
                        id="r-home"
                        name="home"
                        label="Home"
                        defaultValue={HOME_OPTIONS[0]}
                    >
                        {HOME_OPTIONS.map((o) => (
                            <MenuItem key={o} value={o}>
                                {o}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        id="r-type"
                        name="type"
                        label="Type"
                        defaultValue={TYPE_OPTIONS[0]}
                    >
                        {TYPE_OPTIONS.map((o) => (
                            <MenuItem key={o} value={o}>
                                {o}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="r-desc"
                        name="description"
                        label="What's going on?"
                        multiline
                        rows={4}
                        required
                    />
                    <Button
                        component="label"
                        sx={(theme) => ({
                            minHeight: theme.spacing(8),
                            ...theme.typography.body2,
                            fontWeight: theme.typography.fontWeightSemiBold,
                            borderStyle: "dashed",
                            borderColor: "border.dashed",
                            bgcolor: "background.muted",
                            color: "text.secondary",
                            "&:hover": {
                                bgcolor: "background.muted",
                                borderColor: "border.strong",
                            },
                        })}
                    >
                        Add photos or plans
                        <VisuallyHidden>
                            <input
                                type="file"
                                name="files"
                                accept="image/*,application/pdf"
                                multiple
                            />
                        </VisuallyHidden>
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={(theme) => ({
                            minHeight: theme.layout.control.lg,
                            fontSize: theme.typography.subtitle1.fontSize,
                        })}
                    >
                        Submit request
                    </Button>
                    {submitted && (
                        <Alert severity="info" role="status">
                            Your request is ready to send once requests are
                            connected.
                        </Alert>
                    )}
                </Stack>
            </Card>
        </Box>
    )
}
