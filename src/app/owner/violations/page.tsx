import type { Metadata } from "next"
import { PageHeader, Pill } from "@/components/ui"
import NoticeActions from "./NoticeActions"

export const metadata: Metadata = { title: "Violations" }

// Placeholder data until the Supabase tables exist.
const OPEN_NOTICE = {
    home: "14 Willow Bend Ct",
    sent: "Oct 9",
    status: "Open · courtesy notice",
    title: "Trash bins visible from the street",
    body: "CC&Rs §7.3 asks that bins be stored out of view from the street except on pickup days. Please move them behind the side gate or into the garage.",
    resolveBy: "Oct 23",
    daysLeft: 8,
}

const STEPS = [
    { label: "Courtesy notice", current: true },
    { label: "Second notice after Oct 23" },
    { label: "$50 fine after 14 more days" },
    { label: "Hearing with the board" },
]

const CLOSED = [
    { title: "Lawn height over 6 inches", detail: "9 Heron Way · fixed Jun 5" },
    {
        title: "Holiday lights up past Feb 1",
        detail: "14 Willow Bend Ct · fixed Feb 6",
    },
]

export default function OwnerViolations() {
    const n = OPEN_NOTICE
    return (
        <>
            <PageHeader
                title="Violations"
                description="Notices for your rented home come to you, not your tenant. You can forward one to them from the notice."
            />

            <div className="split">
                <section
                    className="card card-attention split-main"
                    style={{ padding: 22, gap: 16 }}
                >
                    <div
                        className="row-wrap"
                        style={{ justifyContent: "space-between", gap: 8 }}
                    >
                        <span className="text-sm strong muted">
                            {n.home} · Notice sent {n.sent}
                        </span>
                        <Pill tone="amber">
                            <span className="bold">{n.status}</span>
                        </Pill>
                    </div>
                    <h2
                        className="display"
                        style={{ fontSize: 24, lineHeight: 1.2 }}
                    >
                        {n.title}
                    </h2>
                    <p className="lead" style={{ lineHeight: 1.5 }}>
                        {n.body}
                    </p>
                    <div
                        role="img"
                        aria-label={`Inspection photo from ${n.sent}`}
                        className="text-md muted"
                        style={{
                            height: 180,
                            borderRadius: 12,
                            background: "var(--gray-bg)",
                            border: "1px dashed #b6c1cf",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        [Inspection photo from {n.sent}]
                    </div>
                    <div
                        className="row-wrap"
                        style={{
                            justifyContent: "space-between",
                            gap: 12,
                            padding: 14,
                            borderRadius: 12,
                            background: "var(--amber-wash)",
                        }}
                    >
                        <span
                            className="strong"
                            style={{ color: "var(--amber-fg)" }}
                        >
                            Resolve by {n.resolveBy} · {n.daysLeft} days left
                        </span>
                        <span className="text-md" style={{ color: "#5c3a10" }}>
                            No fine if it&apos;s fixed by then
                        </span>
                    </div>
                    <NoticeActions />
                </section>

                <aside className="split-side stack" style={{ gap: 16 }}>
                    <section className="card" style={{ padding: 18, gap: 12 }}>
                        <h2 className="h3">What happens next</h2>
                        <ol
                            className="stack text-md"
                            style={{
                                margin: 0,
                                padding: "0 0 0 20px",
                                gap: 8,
                                lineHeight: 1.45,
                            }}
                        >
                            {STEPS.map((s) =>
                                s.current ? (
                                    <li key={s.label} aria-current="step">
                                        <strong>{s.label}</strong> — you are
                                        here
                                    </li>
                                ) : (
                                    <li key={s.label} className="muted">
                                        {s.label}
                                    </li>
                                )
                            )}
                        </ol>
                    </section>
                    <section className="card" style={{ padding: 18, gap: 0 }}>
                        <h2 className="h3" style={{ marginBottom: 4 }}>
                            Closed
                        </h2>
                        {CLOSED.map((c) => (
                            <div
                                key={c.title}
                                className="list-row stack"
                                style={{
                                    alignItems: "stretch",
                                    gap: 2,
                                    padding: "10px 0",
                                }}
                            >
                                <span className="strong">{c.title}</span>
                                <span className="text-sm muted">
                                    {c.detail}
                                </span>
                            </div>
                        ))}
                    </section>
                </aside>
            </div>
        </>
    )
}
