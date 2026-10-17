"use client"

import { useState } from "react"
import { PageHeader, Pill } from "@/components/ui"

type Kind = "Maintenance" | "Architectural"
type Column = "new" | "review" | "vote" | "scheduled" | "done"

// Placeholder data until the Supabase tables exist.
const REQUESTS: {
    col: Column
    kind: Kind
    id: string
    title: string
    home: string
    age: string
}[] = [
    {
        col: "new",
        kind: "Maintenance",
        id: "#1046",
        title: "Gate keypad unresponsive",
        home: "North entrance",
        age: "4h",
    },
    {
        col: "review",
        kind: "Architectural",
        id: "#1044",
        title: "Paint front door dark green",
        home: "30 Marsh Lane",
        age: "1d",
    },
    {
        col: "review",
        kind: "Maintenance",
        id: "#1043",
        title: "Pond fountain pump noisy",
        home: "Common area",
        age: "2d",
    },
    {
        col: "vote",
        kind: "Architectural",
        id: "#1038",
        title: "Replace front fence with 4 ft cedar",
        home: "14 Willow Bend Ct",
        age: "6d",
    },
    {
        col: "vote",
        kind: "Architectural",
        id: "#1041",
        title: "Rooftop solar install",
        home: "7 Heron Way",
        age: "2d",
    },
    {
        col: "scheduled",
        kind: "Maintenance",
        id: "#1042",
        title: "Streetlight out near mailbox cluster B",
        home: "Common area",
        age: "Oct 17",
    },
    {
        col: "done",
        kind: "Maintenance",
        id: "#1019",
        title: "Sprinkler head broken by pond path",
        home: "Common area",
        age: "Sep 30",
    },
    {
        col: "done",
        kind: "Architectural",
        id: "#1027",
        title: "Backyard shed, 8×10",
        home: "18 Heron Way",
        age: "Oct 2",
    },
]

const COLUMNS: { id: Column; title: string }[] = [
    { id: "new", title: "New" },
    { id: "review", title: "Under review" },
    { id: "vote", title: "Needs board vote" },
    { id: "scheduled", title: "Scheduled" },
    { id: "done", title: "Done this month" },
]

const FILTERS: { id: "all" | Kind; label: string }[] = [
    { id: "all", label: "All" },
    { id: "Maintenance", label: "Maintenance" },
    { id: "Architectural", label: "Architectural" },
]

export default function RequestsBoard() {
    const [kind, setKind] = useState<"all" | Kind>("all")
    const visible = REQUESTS.filter((r) => kind === "all" || r.kind === kind)

    return (
        <>
            <PageHeader
                eyebrow="7 open · 2 waiting on a board vote"
                title="Requests"
                actions={
                    <>
                        <div
                            role="group"
                            aria-label="Request type"
                            className="row-wrap"
                            style={{ gap: 8 }}
                        >
                            {FILTERS.map((f) => {
                                const on = f.id === kind
                                return (
                                    <button
                                        key={f.id}
                                        type="button"
                                        className="btn"
                                        aria-pressed={on}
                                        onClick={() => setKind(f.id)}
                                        style={{
                                            borderRadius: 22,
                                            padding: "0 14px",
                                            fontSize: 14,
                                            ...(on
                                                ? {
                                                      background:
                                                          "var(--nav-bg)",
                                                      borderColor:
                                                          "var(--nav-bg)",
                                                      color: "#fff",
                                                  }
                                                : null),
                                        }}
                                    >
                                        {f.label}
                                    </button>
                                )
                            })}
                        </div>
                        <button type="button" className="btn btn-primary">
                            Log request
                        </button>
                    </>
                }
            />

            <div className="table-wrap" style={{ paddingBottom: 8 }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, minmax(240px, 1fr))",
                        gap: 14,
                        alignItems: "start",
                    }}
                >
                    {COLUMNS.map((col) => {
                        const cards = visible.filter((r) => r.col === col.id)
                        return (
                            <section
                                key={col.id}
                                aria-label={col.title}
                                className="stack"
                                style={{
                                    background: "var(--track)",
                                    borderRadius: 16,
                                    padding: 12,
                                    gap: 10,
                                    minHeight: 420,
                                }}
                            >
                                <div
                                    className="spread"
                                    style={{
                                        alignItems: "center",
                                        padding: "4px 4px 2px",
                                    }}
                                >
                                    <h2
                                        className="bold"
                                        style={{ fontSize: 15 }}
                                    >
                                        {col.title}
                                    </h2>
                                    <span className="text-sm bold muted">
                                        {cards.length}
                                    </span>
                                </div>
                                {cards.map((c) => (
                                    <article
                                        key={c.id}
                                        className="card"
                                        style={{
                                            padding: 12,
                                            gap: 8,
                                            borderRadius: 12,
                                        }}
                                    >
                                        <div
                                            className="spread"
                                            style={{
                                                alignItems: "center",
                                                gap: 8,
                                            }}
                                        >
                                            <Pill
                                                tone={
                                                    c.kind === "Maintenance"
                                                        ? "teal"
                                                        : "purple"
                                                }
                                            >
                                                {c.kind}
                                            </Pill>
                                            <span
                                                className="muted"
                                                style={{ fontSize: 12 }}
                                            >
                                                {c.id}
                                            </span>
                                        </div>
                                        <h3
                                            className="strong"
                                            style={{
                                                fontSize: 15,
                                                lineHeight: 1.3,
                                                margin: 0,
                                            }}
                                        >
                                            {c.title}
                                        </h3>
                                        <div
                                            className="spread text-sm muted"
                                            style={{ gap: 8 }}
                                        >
                                            <span>{c.home}</span>
                                            <span>{c.age}</span>
                                        </div>
                                    </article>
                                ))}
                            </section>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
