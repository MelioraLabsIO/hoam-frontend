"use client"

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
        <section
            className="card split-main"
            style={{ padding: 22, gap: 20, flexBasis: 560 }}
            aria-label="New booking"
        >
            <div
                role="group"
                aria-label="Amenity"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(150px, 100%), 1fr))",
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
                            className="stack"
                            style={{
                                minHeight: 64,
                                padding: "12px 14px",
                                borderRadius: 14,
                                border: `1px solid ${sel ? "var(--primary)" : "var(--border)"}`,
                                background: a.closed
                                    ? "var(--gray-bg)"
                                    : sel
                                      ? "var(--primary)"
                                      : "var(--surface)",
                                color: a.closed
                                    ? "#5e6a7b"
                                    : sel
                                      ? "#fff"
                                      : "var(--ink)",
                                textAlign: "left",
                                gap: 3,
                                cursor: a.closed ? "not-allowed" : "pointer",
                            }}
                        >
                            <span className="strong" style={{ fontSize: 16 }}>
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
                <h2 className="bold" style={{ fontSize: 16 }}>
                    October
                </h2>
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
                                aria-label={`${d.dow} October ${d.num}`}
                                onClick={() => {
                                    setDay(d.num)
                                    setReserved(null)
                                }}
                                style={{
                                    height: 62,
                                    borderRadius: 12,
                                    border: `1px solid ${sel ? "var(--nav-bg)" : "var(--border)"}`,
                                    background: sel
                                        ? "var(--nav-bg)"
                                        : "var(--surface)",
                                    color: sel ? "#fff" : "var(--ink)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 2,
                                    padding: 0,
                                    cursor: "pointer",
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
                <h2 className="bold" style={{ fontSize: 16 }}>
                    Available times · 2-hour blocks
                </h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(min(110px, 100%), 1fr))",
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
                                    height: 48,
                                    borderRadius: 12,
                                    border: sel
                                        ? "2px solid var(--primary)"
                                        : "1px solid var(--border)",
                                    background: isBooked
                                        ? "var(--gray-bg)"
                                        : sel
                                          ? "var(--primary-soft)"
                                          : "var(--surface)",
                                    color: isBooked
                                        ? "var(--faint)"
                                        : sel
                                          ? "var(--primary-ink)"
                                          : "var(--ink)",
                                    fontSize: 15,
                                    fontWeight: 600,
                                    textDecoration: isBooked
                                        ? "line-through"
                                        : "none",
                                    cursor: isBooked
                                        ? "not-allowed"
                                        : "pointer",
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
                <div className="stack" style={{ gap: 2 }} aria-live="polite">
                    <span className="text-lg strong">{am.name}</span>
                    <span className="text-md muted">{summary}</span>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ height: 48, padding: "0 24px", fontSize: 16 }}
                    disabled={!slotOk}
                    onClick={() =>
                        setReserved(
                            `${am.name} · ${summary} is held for you once bookings are connected.`
                        )
                    }
                >
                    Reserve
                </button>
            </div>
            {reserved && (
                <p className="callout callout-info" role="status">
                    {reserved}
                </p>
            )}
        </section>
    )
}
