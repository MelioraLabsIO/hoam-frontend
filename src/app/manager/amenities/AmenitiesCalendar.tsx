"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui"
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
                        <button
                            type="button"
                            className="btn btn-icon"
                            aria-label="Previous week"
                            onClick={() => setWeek((w) => w - 1)}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            className="btn btn-icon"
                            aria-label="Next week"
                            onClick={() => setWeek((w) => w + 1)}
                        >
                            <ChevronRight size={18} />
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => setNotice("Blocking off time")}
                        >
                            Block off time
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setNotice("Adding bookings")}
                        >
                            Add booking
                        </button>
                    </>
                }
            />

            {notice && (
                <p className="callout callout-info" role="status">
                    {notice} will be available once amenity bookings are
                    connected.
                </p>
            )}

            <section
                className="card"
                style={{ padding: 16 }}
                aria-label={`Bookings ${fmt(days[0])} to ${fmt(days[6])}`}
            >
                <div className="table-wrap">
                    <div
                        role="table"
                        style={{
                            minWidth: 940,
                            display: "grid",
                            gridTemplateColumns:
                                "150px repeat(7, minmax(0, 1fr))",
                            gap: 6,
                        }}
                    >
                        <div role="row" style={{ display: "contents" }}>
                            <div role="columnheader">
                                <span className="visually-hidden">Amenity</span>
                            </div>
                            {days.map((d) => (
                                <div
                                    role="columnheader"
                                    key={d.toISOString()}
                                    className="stack"
                                    style={{ padding: "6px 4px 10px", gap: 1 }}
                                >
                                    <span
                                        className="bold muted"
                                        style={{ fontSize: 12 }}
                                    >
                                        {DOW[d.getDay()]}
                                    </span>
                                    <span
                                        className="display"
                                        style={{ fontSize: 18 }}
                                    >
                                        {d.getDate()}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {AMENITIES.map((a) => (
                            <div
                                role="row"
                                style={{ display: "contents" }}
                                key={a.name}
                            >
                                <div
                                    role="rowheader"
                                    className="stack"
                                    style={{
                                        padding: "10px 4px",
                                        gap: 2,
                                        borderTop: "1px solid var(--divider)",
                                    }}
                                >
                                    <span className="text-md strong">
                                        {a.name}
                                    </span>
                                    <span
                                        className="muted"
                                        style={{ fontSize: 12 }}
                                    >
                                        {a.hours}
                                    </span>
                                </div>
                                {days.map((d, i) => (
                                    <div
                                        role="cell"
                                        key={d.toISOString()}
                                        className="stack"
                                        style={{
                                            minHeight: 76,
                                            borderTop:
                                                "1px solid var(--divider)",
                                            paddingTop: 6,
                                            gap: 4,
                                        }}
                                    >
                                        {cellItems(a, i).map((b) => (
                                            <div
                                                className={`block block-${b.tone}`}
                                                key={b.time + b.who}
                                            >
                                                <span className="bold">
                                                    {b.time}
                                                </span>
                                                <span>{b.who}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
