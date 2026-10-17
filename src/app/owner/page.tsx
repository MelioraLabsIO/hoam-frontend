import type { Metadata } from "next"
import Link from "next/link"
import { Announcement, DateTile, Pill, type Tone } from "@/components/ui"

export const metadata: Metadata = { title: "Home" }

// Placeholder data until the Supabase tables exist.
const ANNOUNCEMENTS: {
    meta: string
    title: string
    body?: string
    pinned?: boolean
    tag?: { label: string; tone: Tone }
}[] = [
    {
        meta: "From the board · Oct 12",
        title: "Pool resurfacing starts Oct 21 — closed for two weeks",
        body: "The clubhouse stays open. Gate codes reset on reopening; new codes will be posted here.",
        pinned: true,
    },
    {
        meta: "Board · Oct 14",
        title: "Proxy forms due before the annual meeting",
        body: "Can't attend on Nov 12? Assign a proxy so your vote still counts.",
        tag: { label: "Owners only", tone: "blue" },
    },
    { meta: "Management · Oct 10", title: "Leaf pickup moves to Thursdays" },
]

const HOMES = [
    { address: "14 Willow Bend Ct", note: "You live here" },
    {
        address: "9 Heron Way",
        note: "Rented to Jordan Lee · lease ends Jul 2027",
    },
]

const EVENTS = [
    {
        month: "Oct",
        day: 24,
        title: "Board meeting",
        detail: "7:00 PM · Clubhouse",
    },
    {
        month: "Nov",
        day: 12,
        title: "Annual owners meeting",
        detail: "6:30 PM · Clubhouse",
    },
]

export default function OwnerHome() {
    return (
        <>
            <h1 className="h1">Good afternoon, Dana</h1>

            <div className="grid-cards">
                <div className="card card-hero">
                    <div
                        className="row"
                        style={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }}
                    >
                        <div className="stack" style={{ gap: 4 }}>
                            <span
                                className="text-md"
                                style={{ fontWeight: 500, opacity: 0.85 }}
                            >
                                Due across your 2 homes
                            </span>
                            <span className="display" style={{ fontSize: 36 }}>
                                $570.00
                            </span>
                        </div>
                        <Pill tone="amber" large>
                            Due Nov 1
                        </Pill>
                    </div>
                    <Link href="/owner/dues" className="btn btn-inverse">
                        Review and pay
                    </Link>
                </div>

                <div className="card card-attention" style={{ gap: 10 }}>
                    <span
                        className="text-sm bold"
                        style={{ color: "var(--amber-fg)" }}
                    >
                        Needs your response
                    </span>
                    <span
                        className="text-lg strong"
                        style={{ lineHeight: 1.3 }}
                    >
                        Trash bins visible from the street · 14 Willow Bend Ct
                    </span>
                    <span className="text-md muted">Resolve by Oct 23</span>
                    <Link
                        href="/owner/violations"
                        className="strong"
                        style={{ marginTop: "auto" }}
                    >
                        Open notice
                    </Link>
                </div>

                <div className="card" style={{ gap: 10 }}>
                    <span className="text-sm bold muted">
                        Annual meeting · Nov 12
                    </span>
                    <span
                        className="text-lg strong"
                        style={{ lineHeight: 1.3 }}
                    >
                        Vote on the 2027 budget and two board seats
                    </span>
                    <div className="row-wrap" style={{ marginTop: "auto" }}>
                        <button
                            type="button"
                            className="btn btn-primary btn-flex"
                        >
                            Cast vote
                        </button>
                        <button type="button" className="btn btn-flex">
                            Assign proxy
                        </button>
                    </div>
                </div>
            </div>

            <div className="split">
                <section className="split-main stack">
                    <h2 className="h2-lg">Announcements</h2>
                    {ANNOUNCEMENTS.map((a) => (
                        <Announcement key={a.title} {...a} />
                    ))}
                </section>

                <aside className="split-side stack" style={{ gap: 16 }}>
                    <section className="card" style={{ padding: 18, gap: 12 }}>
                        <h2 className="h3">Your homes</h2>
                        {HOMES.map((h) => (
                            <Link
                                key={h.address}
                                href="/owner/homes"
                                className="tile"
                            >
                                <span className="strong">{h.address}</span>
                                <span className="text-sm muted">{h.note}</span>
                            </Link>
                        ))}
                    </section>
                    <section className="card" style={{ padding: 18, gap: 12 }}>
                        <h2 className="h3">Coming up</h2>
                        {EVENTS.map((e) => (
                            <div className="row" key={e.title}>
                                <DateTile month={e.month} day={e.day} />
                                <div className="stack" style={{ gap: 2 }}>
                                    <span className="strong">{e.title}</span>
                                    <span className="text-sm muted">
                                        {e.detail}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </section>
                </aside>
            </div>
        </>
    )
}
