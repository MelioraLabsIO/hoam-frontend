"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import type { Theme } from "@mui/material/styles"
import ToggleButton from "@mui/material/ToggleButton"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { PageHeader, Pill } from "@/components/ui"

type Kind = "Maintenance" | "Architectural"
type Column = "new" | "review" | "vote" | "scheduled" | "done"

// Placeholder data until the Supabase tables exist.
const REQUESTS: {
    col: Column
    kind: Kind
    id: string
    title: string
    home: string
    age: string
}[] = [
    {
        col: "new",
        kind: "Maintenance",
        id: "#1046",
        title: "Gate keypad unresponsive",
        home: "North entrance",
        age: "4h",
    },
    {
        col: "review",
        kind: "Architectural",
        id: "#1044",
        title: "Paint front door dark green",
        home: "30 Marsh Lane",
        age: "1d",
    },
    {
        col: "review",
        kind: "Maintenance",
        id: "#1043",
        title: "Pond fountain pump noisy",
        home: "Common area",
        age: "2d",
    },
    {
        col: "vote",
        kind: "Architectural",
        id: "#1038",
        title: "Replace front fence with 4 ft cedar",
        home: "14 Willow Bend Ct",
        age: "6d",
    },
    {
        col: "vote",
        kind: "Architectural",
        id: "#1041",
        title: "Rooftop solar install",
        home: "7 Heron Way",
        age: "2d",
    },
    {
        col: "scheduled",
        kind: "Maintenance",
        id: "#1042",
        title: "Streetlight out near mailbox cluster B",
        home: "Common area",
        age: "Oct 17",
    },
    {
        col: "done",
        kind: "Maintenance",
        id: "#1019",
        title: "Sprinkler head broken by pond path",
        home: "Common area",
        age: "Sep 30",
    },
    {
        col: "done",
        kind: "Architectural",
        id: "#1027",
        title: "Backyard shed, 8×10",
        home: "18 Heron Way",
        age: "Oct 2",
    },
]

const COLUMNS: { id: Column; title: string }[] = [
    { id: "new", title: "New" },
    { id: "review", title: "Under review" },
    { id: "vote", title: "Needs board vote" },
    { id: "scheduled", title: "Scheduled" },
    { id: "done", title: "Done this month" },
]

const FILTERS: { id: "all" | Kind; label: string }[] = [
    { id: "all", label: "All" },
    { id: "Maintenance", label: "Maintenance" },
    { id: "Architectural", label: "Architectural" },
]

/** White bordered pill that turns dark when pressed. */
const filterChipSx = (theme: Theme) => ({
    minHeight: theme.layout.tapTarget,
    borderRadius: `${theme.radius.pill}px`,
    border: 1,
    borderColor: "border.input",
    bgcolor: "background.paper",
    color: "text.primary",
    "&:hover": { bgcolor: "background.paper", borderColor: "border.strong" },
    "&.Mui-selected, &.Mui-selected:hover": { borderColor: "nav.main" },
})

export default function RequestsBoard() {
    const [kind, setKind] = useState<"all" | Kind>("all")
    const visible = REQUESTS.filter((r) => kind === "all" || r.kind === kind)

    return (
        <>
            <PageHeader
                eyebrow="7 open · 2 waiting on a board vote"
                title="Requests"
                actions={
                    <>
                        <Stack
                            direction="row"
                            role="group"
                            aria-label="Request type"
                            sx={{
                                flexWrap: "wrap",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            {FILTERS.map((f) => (
                                <ToggleButton
                                    key={f.id}
                                    value={f.id}
                                    color="nav"
                                    selected={f.id === kind}
                                    onChange={() => setKind(f.id)}
                                    sx={filterChipSx}
                                >
                                    {f.label}
                                </ToggleButton>
                            ))}
                        </Stack>
                        <Button variant="contained">Log request</Button>
                    </>
                }
            />

            <Box sx={{ position: "relative", overflowX: "auto", pb: 1 }}>
                <Box
                    sx={(theme) => ({
                        display: "grid",
                        gridTemplateColumns: `repeat(5, minmax(${theme.spacing(30)}, 1fr))`,
                        gap: 1.75,
                        alignItems: "start",
                    })}
                >
                    {COLUMNS.map((col) => {
                        const cards = visible.filter((r) => r.col === col.id)
                        return (
                            <Stack
                                component="section"
                                key={col.id}
                                aria-label={col.title}
                                sx={(theme) => ({
                                    bgcolor: "track",
                                    borderRadius: `${theme.radius.xl}px`,
                                    p: 1.5,
                                    gap: 1.25,
                                    minHeight: theme.spacing(52.5),
                                })}
                            >
                                <Stack
                                    direction="row"
                                    sx={{
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 1.5,
                                        pt: 0.5,
                                        px: 0.5,
                                        pb: 0.25,
                                    }}
                                >
                                    <Typography
                                        component="h2"
                                        sx={{ fontWeight: "fontWeightBold" }}
                                    >
                                        {col.title}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ fontWeight: "fontWeightBold" }}
                                    >
                                        {cards.length}
                                    </Typography>
                                </Stack>
                                {cards.map((c) => (
                                    <Card
                                        component="article"
                                        key={c.id}
                                        sx={(theme) => ({
                                            p: 1.5,
                                            gap: 1,
                                            borderRadius: `${theme.radius.md}px`,
                                        })}
                                    >
                                        <Stack
                                            direction="row"
                                            sx={{
                                                flexWrap: "wrap",
                                                alignItems: "center",
                                                justifyContent:
                                                    "space-between",
                                                gap: 1,
                                            }}
                                        >
                                            <Pill
                                                tone={
                                                    c.kind === "Maintenance"
                                                        ? "teal"
                                                        : "purple"
                                                }
                                            >
                                                {c.kind}
                                            </Pill>
                                            <Typography
                                                variant="micro"
                                                color="text.secondary"
                                                sx={{
                                                    fontWeight:
                                                        "fontWeightRegular",
                                                }}
                                            >
                                                {c.id}
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            component="h3"
                                            sx={{
                                                fontWeight:
                                                    "fontWeightSemiBold",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {c.title}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            sx={{
                                                flexWrap: "wrap",
                                                alignItems: "baseline",
                                                justifyContent:
                                                    "space-between",
                                                gap: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {c.home}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {c.age}
                                            </Typography>
                                        </Stack>
                                    </Card>
                                ))}
                            </Stack>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}
