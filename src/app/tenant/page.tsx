import type { Metadata } from "next"
import Link from "next/link"
import { Announcement, DateTile, PageHeader } from "@/components/ui"

export const metadata: Metadata = { title: "Home" }

// Placeholder data until the Supabase tables exist.
const TENANT = {
    firstName: "Jordan",
    home: "9 Heron Way",
    landlord: "Dana Ortega",
}

const PICKUP_DAYS = [
    { label: "Trash & recycling", day: "Tuesday" },
    { label: "Leaf and yard waste", day: "Thursday" },
]

const NEWS: { meta: string; title: string; body?: string; pinned?: boolean }[] =
    [
        {
            meta: "Oct 12",
            title: "Pool resurfacing starts Oct 21 — closed for two weeks",
            body: "The clubhouse stays open. Gate codes reset on reopening.",
            pinned: true,
        },
        {
            meta: "Management · Oct 10",
            title: "Leaf pickup moves to Thursdays",
        },
    ]

const EVENTS = [
    {
        month: "Oct",
        day: 31,
        title: "Trunk-or-treat",
        detail: "5:30 PM · North lot",
    },
    {
        month: "Nov",
        day: 4,
        title: "Pool reopens",
        detail: "New gate codes posted",
    },
]

export default function TenantHome() {
    return (
        <>
            <PageHeader
                title={`Welcome home, ${TENANT.firstName}`}
                description={`Your landlord, ${TENANT.landlord}, handles HOA dues and notices for ${TENANT.home}.`}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
                    gap: 16,
                }}
            >
                <Link
                    href="/tenant/maintenance"
                    className="card card-hero"
                    style={{ gap: 6, minHeight: 110 }}
                >
                    <span className="h2">Report an issue</span>
                    <span className="text-md" style={{ opacity: 0.9 }}>
                        Streetlights, gates, common areas. Your landlord gets a
                        copy.
                    </span>
                </Link>
                <Link
                    href="/tenant/amenities"
                    className="card"
                    style={{ gap: 6, minHeight: 110 }}
                >
                    <span className="h2">Book an amenity</span>
                    <span className="text-md muted">
                        Clubhouse, tennis and pickleball courts
                    </span>
                </Link>
                <section className="card" style={{ gap: 8 }}>
                    <h2 className="h2">Pickup days</h2>
                    {PICKUP_DAYS.map((p) => (
                        <span key={p.label} className="text-md muted">
                            {p.label} · {p.day}
                        </span>
                    ))}
                </section>
            </div>

            <div className="split">
                <section className="split-main stack">
                    <h2 className="h2-lg">Community news</h2>
                    {NEWS.map((n) => (
                        <Announcement
                            key={n.title}
                            meta={n.meta}
                            title={n.title}
                            body={n.body}
                            pinned={n.pinned}
                        />
                    ))}
                </section>
                <aside
                    className="split-side card"
                    style={{ padding: 18, gap: 12 }}
                >
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
                </aside>
            </div>
        </>
    )
}
