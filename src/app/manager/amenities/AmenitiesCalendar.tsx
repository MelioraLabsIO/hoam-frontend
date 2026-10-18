"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { CalendarBlock, PageHeader, VisuallyHidden } from "@/components/ui"
import { ChevronLeft, ChevronRight } from "@/components/icons"

type BlockTone = "blue" | "teal" | "gray"
type Booking = { time: string; who: string }

// Placeholder data until the Supabase tables exist.
// Bookings are keyed by day index (0 = Thu Oct 15) for the week of Oct 15, 2026.
const WEEK_START = new Date(2026, 9, 15)
const POOL_REOPENS = new Date(2026, 10, 4)

const AMENITIES: {
    name: string
    hours: string
    tone: BlockTone
    closed?: boolean
    bookings: Record<number, Booking[]>
}[] = [
    {
        name: "Clubhouse",
        hours: "8 AM – 10 PM",
        tone: "blue",
        bookings: {
            1: [{ time: "2–6 PM", who: "Birthday · 9 Heron" }],
            3: [{ time: "2–4 PM", who: "Book club · 14 Willow" }],
            5: [{ time: "7–9 PM", who: "Board meeting" }],
        },
    },
    {
        name: "Tennis · Court 1",
        hours: "7 AM – 9 PM",
        tone: "teal",
        bookings: {
            0: [{ time: "6–8 PM", who: "30 Marsh" }],
            2: [
                { time: "10 AM–12", who: "30 Marsh" },
                { time: "4–6 PM", who: "7 Heron" },
            ],
            6: [{ time: "8–10 AM", who: "22 Marsh" }],
        },
    },
    {
        name: "Tennis · Court 2",
        hours: "7 AM – 9 PM",
        tone: "teal",
        bookings: {
            2: [{ time: "9–11 AM", who: "Clinic" }],
            3: [{ time: "9–11 AM", who: "Clinic" }],
        },
    },
    {
        name: "Pickleball",
        hours: "7 AM – 9 PM",
        tone: "teal",
        bookings: {
            0: [{ time: "8–10 AM", who: "Open play" }],
            1: [{ time: "8–10 AM", who: "Open play" }],
            4: [{ time: "5–7 PM", who: "41 Willow" }],
        },
    },
    {
        name: "Pool",
        hours: "Closed for resurfacing",
        tone: "gray",
        closed: true,
        bookings: {},
    },
]

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTH = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

function addDays(d: Date, n: number) {
    const r = new Date(d)
    r.setDate(r.getDate() + n)
    return r
}

const fmt = (d: Date) => `${MONTH[d.getMonth()]} ${d.getDate()}`

export default function AmenitiesCalendar() {
    const [week, setWeek] = useState(0)
    const [notice, setNotice] = useState<string | null>(null)

    const start = addDays(WEEK_START, week * 7)
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i))

    function cellItems(
        a: (typeof AMENITIES)[number],
        i: number
    ): { time: string; who: string; tone: BlockTone }[] {
        if (a.closed)
            return days[i] < POOL_REOPENS
                ? [{ time: "Closed", who: "Resurfacing", tone: "gray" }]
                : []
        if (week !== 0) return []
        return (a.bookings[i] ?? []).map((b) => ({ ...b, tone: a.tone }))
    }

    return (
        <>
            <PageHeader
                eyebrow={`${fmt(days[0])} – ${fmt(days[6])}`}
                title="Amenities"
                actions={
                    <>
                        <IconButton
                            aria-label="Previous week"
                            onClick={() => setWeek((w) => w - 1)}
                        >
                            <ChevronLeft fontSize="small" />
                        </IconButton>
                        <IconButton
                            aria-label="Next week"
                            onClick={() => setWeek((w) => w + 1)}
                        >
                            <ChevronRight fontSize="small" />
                        </IconButton>
                        <Button onClick={() => setNotice("Blocking off time")}>
                            Block off time
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setNotice("Adding bookings")}
                        >
                            Add booking
                        </Button>
                    </>
                }
            />

            {notice && (
                <Alert severity="info" role="status">
                    {notice} will be available once amenity bookings are
                    connected.
                </Alert>
            )}

            <Card
                component="section"
                sx={{ p: 2 }}
                aria-label={`Bookings ${fmt(days[0])} to ${fmt(days[6])}`}
            >
                <Box sx={{ position: "relative", overflowX: "auto" }}>
                    <Box
                        role="table"
                        sx={(theme) => ({
                            minWidth: theme.spacing(117.5),
                            display: "grid",
                            gridTemplateColumns: `${theme.spacing(18.75)} repeat(7, minmax(0, 1fr))`,
                            gap: 0.75,
                        })}
                    >
                        <Box role="row" sx={{ display: "contents" }}>
                            <Box role="columnheader">
                                <VisuallyHidden>Amenity</VisuallyHidden>
                            </Box>
                            {days.map((d) => (
                                <Stack
                                    role="columnheader"
                                    key={d.toISOString()}
                                    sx={{
                                        pt: 0.75,
                                        px: 0.5,
                                        pb: 1.25,
                                        gap: 0.125,
                                    }}
                                >
                                    <Typography
                                        variant="micro"
                                        component="span"
                                        color="text.secondary"
                                        sx={{ fontWeight: "fontWeightBold" }}
                                    >
                                        {DOW[d.getDay()]}
                                    </Typography>
                                    <Typography variant="h5" component="span">
                                        {d.getDate()}
                                    </Typography>
                                </Stack>
                            ))}
                        </Box>
                        {AMENITIES.map((a) => (
                            <Box
                                role="row"
                                sx={{ display: "contents" }}
                                key={a.name}
                            >
                                <Stack
                                    role="rowheader"
                                    sx={{
                                        py: 1.25,
                                        px: 0.5,
                                        gap: 0.25,
                                        borderTop: 1,
                                        borderColor: "divider",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        sx={{ fontWeight: "fontWeightSemiBold" }}
                                    >
                                        {a.name}
                                    </Typography>
                                    <Typography
                                        variant="micro"
                                        component="span"
                                        color="text.secondary"
                                        sx={{ fontWeight: "fontWeightRegular" }}
                                    >
                                        {a.hours}
                                    </Typography>
                                </Stack>
                                {days.map((d, i) => (
                                    <Stack
                                        role="cell"
                                        key={d.toISOString()}
                                        sx={{
                                            minHeight: (theme) =>
                                                theme.spacing(9.5),
                                            borderTop: 1,
                                            borderColor: "divider",
                                            pt: 0.75,
                                            gap: 0.5,
                                        }}
                                    >
                                        {cellItems(a, i).map((b) => (
                                            <CalendarBlock
                                                tone={b.tone}
                                                key={b.time + b.who}
                                            >
                                                <Typography
                                                    variant="inherit"
                                                    component="span"
                                                    sx={{
                                                        fontWeight:
                                                            "fontWeightBold",
                                                    }}
                                                >
                                                    {b.time}
                                                </Typography>
                                                <Typography
                                                    variant="inherit"
                                                    component="span"
                                                >
                                                    {b.who}
                                                </Typography>
                                            </CalendarBlock>
                                        ))}
                                    </Stack>
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Card>
        </>
    )
}
