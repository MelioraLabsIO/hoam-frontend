import type { Metadata } from "next"
import { KeyValue, Pill, type Tone } from "@/components/ui"
import AmenitiesCalendar from "./AmenitiesCalendar"

export const metadata: Metadata = { title: "Amenities" }

// Placeholder data until the Supabase tables exist.
const RULES: {
    name: string
    status: string
    tone: Tone
    capacity: string
    max: string
    deposit: string
}[] = [
    {
        name: "Clubhouse",
        status: "Open",
        tone: "blue",
        capacity: "40 guests",
        max: "4 hours",
        deposit: "$100",
    },
    {
        name: "Tennis courts",
        status: "Open",
        tone: "blue",
        capacity: "2 courts",
        max: "2 hours",
        deposit: "None",
    },
    {
        name: "Pickleball",
        status: "Open",
        tone: "blue",
        capacity: "4 courts",
        max: "2 hours",
        deposit: "None",
    },
    {
        name: "Pool",
        status: "Closed to Nov 4",
        tone: "amber",
        capacity: "60 swimmers",
        max: "No booking",
        deposit: "None",
    },
]

export default function ManagerAmenities() {
    return (
        <>
            <AmenitiesCalendar />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
                    gap: 16,
                }}
            >
                {RULES.map((r) => (
                    <section
                        className="card card-tight"
                        style={{ padding: 18 }}
                        key={r.name}
                    >
                        <div
                            className="row"
                            style={{ justifyContent: "space-between", gap: 8 }}
                        >
                            <h2 className="h3">{r.name}</h2>
                            <Pill tone={r.tone}>{r.status}</Pill>
                        </div>
                        <div className="stack" style={{ gap: 6 }}>
                            <KeyValue label="Capacity" value={r.capacity} />
                            <KeyValue label="Max per booking" value={r.max} />
                            <KeyValue label="Deposit" value={r.deposit} />
                        </div>
                        <button
                            type="button"
                            className="link-strong"
                            aria-label={`Edit rules for ${r.name}`}
                            style={{
                                alignSelf: "flex-start",
                                padding: 0,
                                border: "none",
                                background: "none",
                                color: "var(--primary)",
                                cursor: "pointer",
                            }}
                        >
                            Edit rules
                        </button>
                    </section>
                ))}
            </div>
        </>
    )
}
