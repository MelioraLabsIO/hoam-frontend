"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"

// Placeholder data until the Supabase tables exist.
const AMENITIES = [
    { id: "club", name: "Clubhouse", note: "Up to 40 guests" },
    { id: "tennis", name: "Tennis court", note: "2 courts" },
    { id: "pickle", name: "Pickleball", note: "4 courts" },
    { id: "pool", name: "Pool", note: "Closed until Nov 4", closed: true },
]
const DAYS = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"].map(
    (dow, i) => ({ dow, num: 15 + i })
)
const TIMES = ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM"]
const BOOKED_BY_DAY: Record<number, number[]> = {
    15: [0, 4],
    16: [2, 5],
    17: [1, 2, 3],
    18: [0, 5],
    19: [1],
    20: [4],
    21: [],
}

export default function BookingPicker() {
    const [amenity, setAmenity] = useState("club")
    const [day, setDay] = useState(18)
    const [slot, setSlot] = useState("2 PM")
    const [reserved, setReserved] = useState<string | null>(null)

    const booked = BOOKED_BY_DAY[day] ?? []
    const slotOk = !booked.includes(TIMES.indexOf(slot))
    const am = AMENITIES.find((a) => a.id === amenity) ?? AMENITIES[0]
    const dayObj = DAYS.find((d) => d.num === day) ?? DAYS[0]
    const summary = slotOk
        ? `${dayObj.dow}, Oct ${dayObj.num} · ${slot} · for 14 Willow Bend Ct`
        : "Pick an open time"

    return (
        <Card
            component="section"
            aria-label="New booking"
            sx={{ p: 2.75, gap: 2.5 }}
        >
            <Box
                role="group"
                aria-label="Amenity"
                sx={(theme) => ({
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fit, minmax(min(${theme.spacing(18.75)}, 100%), 1fr))`,
                    gap: 1.25,
                })}
            >
                {AMENITIES.map((a) => {
                    const sel = a.id === amenity
                    const bg = a.closed
                        ? "neutral.soft"
                        : sel
                          ? "primary.main"
                          : "background.paper"
                    const fg = a.closed
                        ? "text.secondary"
                        : sel
                          ? "primary.contrastText"
                          : "text.primary"
                    const border = sel ? "primary.main" : "border.main"
                    return (
                        <Button
                            key={a.id}
                            disabled={a.closed}
                            aria-pressed={sel}
                            onClick={() => {
                                setAmenity(a.id)
                                setReserved(null)
                            }}
                            sx={(theme) => ({
                                minHeight: theme.spacing(8),
                                py: 1.5,
                                px: 1.75,
                                borderRadius: `${theme.radius.lg}px`,
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "center",
                                textAlign: "left",
                                whiteSpace: "normal",
                                gap: 0.375,
                                bgcolor: bg,
                                color: fg,
                                borderColor: border,
                                "&:hover": { bgcolor: bg, color: fg },
                                "&.Mui-disabled": {
                                    opacity: 1,
                                    bgcolor: bg,
                                    color: fg,
                                    borderColor: border,
                                },
                            })}
                        >
                            <Typography
                                variant="subtitle1"
                                component="span"
                                sx={{ fontWeight: "fontWeightSemiBold" }}
                            >
                                {a.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ opacity: 0.85 }}
                            >
                                {a.note}
                            </Typography>
                        </Button>
                    )
                })}
            </Box>

            <Stack sx={{ gap: 1.25 }}>
                <Typography
                    variant="subtitle1"
                    component="h2"
                    sx={{ fontWeight: "fontWeightBold" }}
                >
                    October
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                        gap: 1,
                    }}
                >
                    {DAYS.map((d) => {
                        const sel = d.num === day
                        return (
                            <Button
                                key={d.num}
                                aria-pressed={sel}
                                aria-label={`${d.dow} October ${d.num}`}
                                onClick={() => {
                                    setDay(d.num)
                                    setReserved(null)
                                }}
                                sx={(theme) => ({
                                    minHeight: theme.spacing(7.75),
                                    minWidth: 0,
                                    p: 0,
                                    borderRadius: `${theme.radius.md}px`,
                                    flexDirection: "column",
                                    gap: 0.25,
                                    borderColor: sel
                                        ? "nav.main"
                                        : "border.main",
                                    bgcolor: sel
                                        ? "nav.main"
                                        : "background.paper",
                                    color: sel
                                        ? "nav.contrastText"
                                        : "text.primary",
                                    "&:hover": {
                                        bgcolor: sel
                                            ? "nav.main"
                                            : "background.paper",
                                        borderColor: sel
                                            ? "nav.main"
                                            : "border.strong",
                                    },
                                })}
                            >
                                <Typography
                                    variant="micro"
                                    sx={{ opacity: 0.85 }}
                                >
                                    {d.dow}
                                </Typography>
                                <Typography variant="dateDay">
                                    {d.num}
                                </Typography>
                            </Button>
                        )
                    })}
                </Box>
            </Stack>

            <Stack sx={{ gap: 1.25 }}>
                <Typography
                    variant="subtitle1"
                    component="h2"
                    sx={{ fontWeight: "fontWeightBold" }}
                >
                    Available times · 2-hour blocks
                </Typography>
                <Box
                    sx={(theme) => ({
                        display: "grid",
                        gridTemplateColumns: `repeat(auto-fit, minmax(min(${theme.spacing(13.75)}, 100%), 1fr))`,
                        gap: 1,
                    })}
                >
                    {TIMES.map((time, i) => {
                        const isBooked = booked.includes(i)
                        const sel = time === slot && !isBooked
                        const bg = isBooked
                            ? "neutral.soft"
                            : sel
                              ? "primary.soft"
                              : "background.paper"
                        const fg = isBooked
                            ? "text.faint"
                            : sel
                              ? "primary.softContrast"
                              : "text.primary"
                        const border = sel ? "primary.main" : "border.main"
                        return (
                            <Button
                                key={time}
                                disabled={isBooked}
                                aria-pressed={sel}
                                aria-label={isBooked ? `${time}, booked` : time}
                                onClick={() => {
                                    setSlot(time)
                                    setReserved(null)
                                }}
                                sx={(theme) => ({
                                    minHeight: theme.layout.control.lg,
                                    minWidth: 0,
                                    px: 1,
                                    borderRadius: `${theme.radius.md}px`,
                                    border: sel ? 2 : 1,
                                    borderColor: border,
                                    bgcolor: bg,
                                    color: fg,
                                    textDecoration: isBooked
                                        ? "line-through"
                                        : "none",
                                    "&:hover": {
                                        bgcolor: bg,
                                        borderColor: sel
                                            ? "primary.main"
                                            : "border.strong",
                                    },
                                    "&.Mui-disabled": {
                                        opacity: 1,
                                        bgcolor: bg,
                                        color: fg,
                                        borderColor: border,
                                    },
                                })}
                            >
                                {time}
                            </Button>
                        )
                    })}
                </Box>
            </Stack>

            <Stack
                direction="row"
                sx={{
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                    pt: 2,
                    borderTop: 1,
                    borderColor: "divider",
                }}
            >
                <Stack sx={{ gap: 0.25 }} aria-live="polite">
                    <Typography variant="h6" component="span">
                        {am.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        component="span"
                        color="text.secondary"
                    >
                        {summary}
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    disabled={!slotOk}
                    onClick={() =>
                        setReserved(
                            `${am.name} · ${summary} is held for you once bookings are connected.`
                        )
                    }
                    sx={(theme) => ({
                        minHeight: theme.layout.control.lg,
                        px: 3,
                        fontSize: theme.typography.subtitle1.fontSize,
                    })}
                >
                    Reserve
                </Button>
            </Stack>
            {reserved && (
                <Alert severity="info" role="status">
                    {reserved}
                </Alert>
            )}
        </Card>
    )
}
