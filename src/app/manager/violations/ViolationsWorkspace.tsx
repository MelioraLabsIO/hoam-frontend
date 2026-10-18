"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import ListItemButton from "@mui/material/ListItemButton"
import Stack from "@mui/material/Stack"
import type { Theme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { Pill } from "@/components/ui"

const STAGES = ["Courtesy notice", "Second notice", "Fine issued", "Hearing"]
const TODAY = "Oct 17"

const actionSx = (theme: Theme) => ({ flex: `1 1 ${theme.spacing(17.5)}` })

type Violation = {
    id: string
    title: string
    home: string
    owner: string
    rule: string
    stageIdx: number
    dates: string[]
    due: string
    late: boolean
    resolved?: boolean
}

// Placeholder data until the Supabase tables exist.
const VIOLATIONS: Violation[] = [
    {
        id: "v1",
        title: "Trash bins visible from street",
        home: "14 Willow Bend Ct",
        owner: "Dana Ortega",
        rule: "CC&Rs §7.3 · Refuse storage",
        stageIdx: 0,
        dates: ["Oct 9"],
        due: "Resolve by Oct 23",
        late: false,
    },
    {
        id: "v2",
        title: "Boat parked in driveway",
        home: "22 Marsh Lane",
        owner: "Priya Natarajan",
        rule: "CC&Rs §5.1 · Vehicles",
        stageIdx: 1,
        dates: ["Sep 18", "Oct 2"],
        due: "3 days overdue",
        late: true,
    },
    {
        id: "v3",
        title: "Unapproved exterior paint color",
        home: "3 Cattail Court",
        owner: "Marcus Webb",
        rule: "Design guidelines §2.4",
        stageIdx: 2,
        dates: ["Aug 20", "Sep 5", "Sep 26"],
        due: "12 days overdue",
        late: true,
    },
    {
        id: "v4",
        title: "Lawn height over 6 inches",
        home: "41 Willow Bend Ct",
        owner: "Kai Mendes",
        rule: "CC&Rs §6.2 · Landscaping",
        stageIdx: 0,
        dates: ["Oct 12"],
        due: "Resolve by Oct 26",
        late: false,
    },
    {
        id: "v5",
        title: "Holiday lights up past Feb 1",
        home: "18 Heron Way",
        owner: "Sam Okafor",
        rule: "Rules §3.7 · Decorations",
        stageIdx: 0,
        dates: ["Oct 14"],
        due: "Resolve by Oct 28",
        late: false,
    },
]

export default function ViolationsWorkspace() {
    // Notices and resolutions update local state only until the backend exists.
    const [items, setItems] = useState(VIOLATIONS)
    const [selId, setSelId] = useState(VIOLATIONS[0].id)
    const sel = items.find((v) => v.id === selId) ?? items[0]
    const atLastStage = sel.stageIdx >= STAGES.length - 1

    function update(patch: (v: Violation) => Violation) {
        setItems((list) => list.map((v) => (v.id === sel.id ? patch(v) : v)))
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
            <Card
                component="section"
                aria-label="Open violations"
                sx={(theme) => ({
                    flex: `999 1 ${theme.layout.split.main}px`,
                    p: 1,
                    gap: 0,
                })}
            >
                {items.map((v) => {
                    const on = v.id === sel.id
                    return (
                        <ListItemButton
                            key={v.id}
                            component="button"
                            type="button"
                            aria-pressed={on}
                            selected={on}
                            onClick={() => setSelId(v.id)}
                            sx={(theme) => ({
                                width: "100%",
                                textAlign: "left",
                                flexWrap: "wrap",
                                gap: 1.75,
                                p: 1.75,
                                borderRadius: `${theme.radius.md}px`,
                                color: "text.primary",
                                bgcolor: "background.paper",
                                "&.Mui-selected, &.Mui-selected:hover": {
                                    bgcolor: "background.sunken",
                                },
                            })}
                        >
                            <Stack
                                component="span"
                                sx={(theme) => ({
                                    flex: `1 1 ${theme.spacing(25)}`,
                                    minWidth: 0,
                                    gap: 0.375,
                                })}
                            >
                                <Typography
                                    component="span"
                                    sx={{ fontWeight: "fontWeightSemiBold" }}
                                >
                                    {v.title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {v.home} · {v.rule}
                                </Typography>
                            </Stack>
                            <Pill tone={v.resolved ? "blue" : "gray"}>
                                {v.resolved ? "Resolved" : STAGES[v.stageIdx]}
                            </Pill>
                            <Typography
                                variant="caption"
                                color={
                                    v.late && !v.resolved
                                        ? "amber.dark"
                                        : "text.secondary"
                                }
                                sx={(theme) => ({
                                    width: theme.spacing(13.75),
                                    textAlign: "right",
                                    fontWeight: "fontWeightSemiBold",
                                })}
                            >
                                {v.resolved ? `Closed ${TODAY}` : v.due}
                            </Typography>
                        </ListItemButton>
                    )
                })}
            </Card>

            <Card
                component="section"
                aria-label="Violation detail"
                aria-live="polite"
                sx={(theme) => ({
                    flex: `1 1 ${theme.spacing(42.5)}`,
                    p: 2.75,
                    gap: 2.25,
                })}
            >
                <Stack sx={{ gap: 0.75 }}>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: "fontWeightSemiBold" }}
                    >
                        {sel.home} · {sel.owner}
                    </Typography>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{ lineHeight: 1.2 }}
                    >
                        {sel.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {sel.rule}
                    </Typography>
                </Stack>
                <Box
                    sx={(theme) => ({
                        height: theme.spacing(18.75),
                        borderRadius: `${theme.radius.md}px`,
                        bgcolor: "neutral.soft",
                        border: 1,
                        borderStyle: "dashed",
                        borderColor: "border.dashed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    })}
                >
                    <Typography variant="body2" color="text.secondary">
                        [Inspection photo]
                    </Typography>
                </Box>
                <Box
                    component="ol"
                    sx={{
                        m: 0,
                        p: 0,
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {STAGES.map((label, i) => {
                        const done = i <= sel.stageIdx
                        const current = i === sel.stageIdx
                        return (
                            <Box
                                component="li"
                                key={label}
                                aria-current={current ? "step" : undefined}
                                sx={(theme) => ({
                                    display: "flex",
                                    gap: 1.5,
                                    alignItems: "flex-start",
                                    minHeight: theme.layout.tapTarget,
                                })}
                            >
                                <Box
                                    aria-hidden="true"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={(theme) => ({
                                            width: theme.spacing(1.75),
                                            height: theme.spacing(1.75),
                                            borderRadius: `${theme.radius.pill}px`,
                                            border: 2,
                                            borderColor: done
                                                ? "primary.main"
                                                : "border.dashed",
                                            bgcolor: done
                                                ? "primary.main"
                                                : "background.paper",
                                            mt: 0.375,
                                        })}
                                    />
                                    <Box
                                        component="span"
                                        sx={(theme) => ({
                                            flex: 1,
                                            width: theme.spacing(0.25),
                                            bgcolor: "border.main",
                                        })}
                                    />
                                </Box>
                                <Stack sx={{ gap: 0.25, pb: 1.25 }}>
                                    <Typography
                                        variant="body2"
                                        color={
                                            done
                                                ? "text.primary"
                                                : "text.secondary"
                                        }
                                        sx={{
                                            fontWeight: current
                                                ? "fontWeightBold"
                                                : "fontWeightMedium",
                                        }}
                                    >
                                        {label}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {done
                                            ? `Sent ${sel.dates[i]}`
                                            : "Not yet"}
                                    </Typography>
                                </Stack>
                            </Box>
                        )
                    })}
                </Box>
                {sel.resolved && (
                    <Alert severity="info" role="status">
                        Marked resolved {TODAY}.
                    </Alert>
                )}
                <Stack
                    direction="row"
                    sx={{ flexWrap: "wrap", alignItems: "center", gap: 1.25 }}
                >
                    <Button
                        variant="contained"
                        sx={actionSx}
                        disabled={sel.resolved}
                        onClick={() =>
                            update((v) => ({ ...v, resolved: true }))
                        }
                    >
                        Mark resolved
                    </Button>
                    <Button
                        sx={actionSx}
                        disabled={sel.resolved || atLastStage}
                        onClick={() =>
                            update((v) => ({
                                ...v,
                                stageIdx: v.stageIdx + 1,
                                dates: [...v.dates, TODAY],
                            }))
                        }
                    >
                        Send next notice
                    </Button>
                </Stack>
            </Card>
        </Box>
    )
}
