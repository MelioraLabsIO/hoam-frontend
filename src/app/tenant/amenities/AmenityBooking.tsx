"use client"

import { useState, type CSSProperties } from "react"

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

const optionBase: CSSProperties = {
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--ink)",
    cursor: "pointer",
}

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
        <section className="card" style={{ padding: 22, gap: 20 }}>
            <div
                role="group"
                aria-label="Amenity"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
                    gap: 10,
                }}
            >
                {AMENITIES.map((a) => {
                    const sel = a.id === amenity
                    return (
                        <button
                            key={a.id}
                            type="button"
                            disabled={a.closed}
                            aria-pressed={sel}
                            onClick={() => {
                                setAmenity(a.id)
                                setReserved(null)
                            }}
                            style={{
                                ...optionBase,
                                minHeight: 64,
                                padding: "12px 14px",
                                borderRadius: 14,
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                                ...(sel && {
                                    background: "var(--primary)",
                                    borderColor: "var(--primary)",
                                    color: "#fff",
                                }),
                                ...(a.closed && {
                                    background: "var(--gray-bg)",
                                    color: "#5E6A7B",
                                    cursor: "not-allowed",
                                }),
                            }}
                        >
                            <span style={{ fontSize: 16, fontWeight: 600 }}>
                                {a.name}
                            </span>
                            <span className="text-sm" style={{ opacity: 0.85 }}>
                                {a.note}
                            </span>
                        </button>
                    )
                })}
            </div>

            <div className="stack" style={{ gap: 10 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>{MONTH}</h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                        gap: 8,
                    }}
                >
                    {DAYS.map((d) => {
                        const sel = d.num === day
                        return (
                            <button
                                key={d.num}
                                type="button"
                                aria-pressed={sel}
                                aria-label={`${d.dow} ${MONTH} ${d.num}`}
                                onClick={() => {
                                    setDay(d.num)
                                    setReserved(null)
                                }}
                                style={{
                                    ...optionBase,
                                    height: 62,
                                    borderRadius: 12,
                                    padding: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 2,
                                    ...(sel && {
                                        background: "var(--nav-bg)",
                                        borderColor: "var(--nav-bg)",
                                        color: "#fff",
                                    }),
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        opacity: 0.85,
                                    }}
                                >
                                    {d.dow}
                                </span>
                                <span
                                    className="display"
                                    style={{ fontSize: 18 }}
                                >
                                    {d.num}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="stack" style={{ gap: 10 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>
                    Available times · 2-hour blocks
                </h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(min(120px, 100%), 1fr))",
                        gap: 8,
                    }}
                >
                    {TIMES.map((time, i) => {
                        const isBooked = booked.includes(i)
                        const sel = time === slot && !isBooked
                        return (
                            <button
                                key={time}
                                type="button"
                                disabled={isBooked}
                                aria-pressed={sel}
                                aria-label={isBooked ? `${time}, booked` : time}
                                onClick={() => {
                                    setSlot(time)
                                    setReserved(null)
                                }}
                                style={{
                                    ...optionBase,
                                    height: 48,
                                    borderRadius: 12,
                                    fontSize: 15,
                                    fontWeight: 600,
                                    ...(sel && {
                                        border: "2px solid var(--primary)",
                                        background: "var(--primary-soft)",
                                        color: "var(--primary-ink)",
                                    }),
                                    ...(isBooked && {
                                        background: "var(--gray-bg)",
                                        color: "var(--faint)",
                                        textDecoration: "line-through",
                                        cursor: "not-allowed",
                                    }),
                                }}
                            >
                                {time}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div
                className="row-wrap"
                style={{
                    justifyContent: "space-between",
                    gap: 12,
                    paddingTop: 16,
                    borderTop: "1px solid var(--divider)",
                }}
            >
                <div className="stack" style={{ gap: 2 }}>
                    <span className="text-lg strong">{am.name}</span>
                    <span className="text-md muted">
                        {slotOk ? when : "Pick an open time"}
                    </span>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ height: 48, padding: "0 24px", fontSize: 16 }}
                    disabled={!slotOk}
                    onClick={() => setReserved(`${am.name} · ${when}`)}
                >
                    Reserve
                </button>
            </div>
            {reserved && (
                <p className="callout callout-info" role="status">
                    {reserved} is held for you. Reservations will be confirmed
                    once booking is connected.
                </p>
            )}
        </section>
    )
}
