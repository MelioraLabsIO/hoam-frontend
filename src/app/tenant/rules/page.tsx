import type { Metadata } from "next"
import { PageHeader } from "@/components/ui"

export const metadata: Metadata = { title: "Community rules" }

// Placeholder data until the Supabase tables exist.
const SUMMARIES = [
    {
        title: "Parking",
        body: "Park in your driveway or garage. Street parking for guests only, no overnight. Boats and trailers need a storage permit.",
    },
    {
        title: "Trash & recycling",
        body: "Bins out after 6 PM the night before pickup, back out of sight by the end of pickup day.",
    },
    {
        title: "Quiet hours",
        body: "10 PM to 7 AM, every day. Clubhouse events end by 10 PM.",
    },
    {
        title: "Pets",
        body: "Leashed in common areas, waste picked up. Register dogs and cats in My household.",
    },
]

const DOCUMENTS = [
    { name: "Rules and regulations", updated: "Jan 18, 2026", href: "#" },
    { name: "Pool and clubhouse rules", updated: "May 2, 2026", href: "#" },
    { name: "Parking and vehicle policy", updated: "Mar 9, 2025", href: "#" },
    { name: "New resident welcome guide", updated: "Aug 1, 2026", href: "#" },
]

export default function TenantRules() {
    return (
        <>
            <PageHeader
                title="Community rules"
                description="The rules that apply to everyone who lives here. A quick summary, with the full versions below."
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
                    gap: 16,
                }}
            >
                {SUMMARIES.map((s) => (
                    <section
                        key={s.title}
                        className="card"
                        style={{ padding: 18, gap: 8 }}
                    >
                        <h2 className="h3">{s.title}</h2>
                        <p className="lead" style={{ lineHeight: 1.5 }}>
                            {s.body}
                        </p>
                    </section>
                ))}
            </div>

            <section
                className="card"
                style={{ padding: "8px 20px", gap: 0 }}
                aria-label="Full rule documents"
            >
                {DOCUMENTS.map((d) => (
                    <div
                        key={d.name}
                        className="list-row"
                        style={{ padding: "14px 0" }}
                    >
                        <span
                            aria-hidden="true"
                            style={{
                                width: 34,
                                height: 40,
                                flex: "0 0 auto",
                                borderRadius: 6,
                                background: "var(--gray-bg)",
                                color: "var(--gray-fg)",
                                fontSize: 10,
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "center",
                                paddingBottom: 6,
                            }}
                        >
                            PDF
                        </span>
                        <div className="stack grow" style={{ gap: 2 }}>
                            <span className="strong">{d.name}</span>
                            <span className="text-sm muted">
                                Updated {d.updated}
                            </span>
                        </div>
                        <a
                            href={d.href}
                            className="link-strong"
                            aria-label={`Download ${d.name} (PDF)`}
                        >
                            Download
                        </a>
                    </div>
                ))}
            </section>
        </>
    )
}
