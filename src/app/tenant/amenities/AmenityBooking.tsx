"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"

// Placeholder data until the Supabase tables exist.
const AMENITIES: {
    id: string
    name: string
    note: string
    closed?: boolean
}[] = [
    { id: "club", name: "Clubhouse", note: "Up to 40 guests" },
    { id: "tennis", name: "Tennis court", note: "2 courts" },
    { id: "pickle", name: "Pickleball", note: "4 courts" },
    { id: "pool", name: "Pool", note: "Closed until Nov 4", closed: true },
]
const MONTH = "October"
const DAYS = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"].map(
    (dow, i) => ({ dow, num: 15 + i })
)
const TIMES = ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM"]
/** Indexes into TIMES that are already booked, per day of the month. */
const BOOKED_BY_DAY: Record<number, number[]> = {
    15: [0, 4],
    16: [2, 5],
    17: [1, 2, 3],
    18: [0, 5],
    19: [1],
    20: [4],
    21: [],
}

/** Unselected option: white with the light card border. */
const optionSx = {
    minWidth: 0,
    "&.MuiButton-outlined": { borderColor: "border.main" },
    "&.MuiButton-outlined:hover": { borderColor: "border.strong" },
} as const

/** Greyed-out option that can't be picked (closed amenity, booked slot). */
const unavailableSx = {
    "&.Mui-disabled": {
        bgcolor: "neutral.soft",
        borderColor: "border.main",
        opacity: 1,
    },
} as const

// Reserving isn't wired to Supabase yet; the button confirms locally.
export default function AmenityBooking() {
    const [amenity, setAmenity] = useState("tennis")
    const [day, setDay] = useState(17)
    const [slot, setSlot] = useState("8 AM")
    const [reserved, setReserved] = useState<string | null>(null)

    const booked = BOOKED_BY_DAY[day] ?? []
    const slotOk = booked.indexOf(TIMES.indexOf(slot)) === -1
    const am = AMENITIES.find((a) => a.id === amenity) ?? AMENITIES[0]
    const dayObj = DAYS.find((d) => d.num === day) ?? DAYS[0]
    const when = `${dayObj.dow}, Oct ${dayObj.num} · ${slot}`

    return (
        <Card component="section" sx={{ p: 2.75, gap: 2.5 }}>
            <Box
                role="group"
                aria-label="Amenity"
                sx={(theme) => ({
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fit, minmax(min(${theme.spacing(22.5)}, 100%), 1fr))`,
                    gap: 1.25,
                })}
            >
                {AMENITIES.map((a) => {
                    const sel = a.id === amenity
                    return (
                        <Button
                            key={a.id}
                            variant={sel ? "contained" : "outlined"}
                            disabled={a.closed}
                            aria-pressed={sel}
                            onClick={() => {
                                setAmenity(a.id)
                                setReserved(null)
                            }}
                            sx={[
                                optionSx,
                                unavailableSx,
                                (theme) => ({
                                    minHeight: theme.spacing(8),
                                    py: 1.5,
                                    px: 1.75,
                                    borderRadius: `${theme.radius.lg}px`,
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    gap: 0.375,
                                    textAlign: "left",
                                    whiteSpace: "normal",
                                    "&.Mui-disabled": {
                                        color: "text.secondary",
                                    },
                                }),
                            ]}
                        >
                            <Typography
                                variant="subtitle1"
                                component="span"
                                sx={{
                                    fontWeight: "fontWeightSemiBold",
                                    lineHeight: 1.2,
                                }}
                            >
                                {a.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                component="span"
                                sx={{ opacity: 0.85, lineHeight: 1.2 }}
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
                    {MONTH}
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
                                variant={sel ? "contained" : "outlined"}
                                color={sel ? "nav" : "primary"}
                                aria-pressed={sel}
                                aria-label={`${d.dow} ${MONTH} ${d.num}`}
                                onClick={() => {
                                    setDay(d.num)
                                    setReserved(null)
                                }}
                                sx={[
                                    optionSx,
                                    (theme) => ({
                                        minHeight: theme.spacing(7.75),
                                        p: 0,
                                        flexDirection: "column",
                                        gap: 0.25,
                                    }),
                                ]}
                            >
                                <Typography
                                    variant="micro"
                                    component="span"
                                    sx={{ opacity: 0.85 }}
                                >
                                    {d.dow}
                                </Typography>
                                <Typography variant="dateDay" component="span">
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
                        gridTemplateColumns: `repeat(auto-fit, minmax(min(${theme.spacing(15)}, 100%), 1fr))`,
                        gap: 1,
                    })}
                >
                    {TIMES.map((time, i) => {
                        const isBooked = booked.includes(i)
                        const sel = time === slot && !isBooked
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
                                sx={[
                                    optionSx,
                                    unavailableSx,
                                    (theme) => ({
                                        minHeight: theme.layout.control.lg,
                                        "&.Mui-disabled": {
                                            color: "text.faint",
                                            textDecoration: "line-through",
                                        },
                                    }),
                                    sel && {
                                        border: 2,
                                        "&.MuiButton-outlined, &.MuiButton-outlined:hover":
                                            {
                                                borderColor: "primary.main",
                                                bgcolor: "primary.soft",
                                                color: "primary.softContrast",
                                            },
                                    },
                                ]}
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
                <Stack sx={{ gap: 0.25 }}>
                    <Typography variant="h6" component="p">
                        {am.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {slotOk ? when : "Pick an open time"}
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    disabled={!slotOk}
                    onClick={() => setReserved(`${am.name} · ${when}`)}
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
                    {reserved} is held for you. Reservations will be confirmed
                    once booking is connected.
                </Alert>
            )}
        </Card>
    )
}
