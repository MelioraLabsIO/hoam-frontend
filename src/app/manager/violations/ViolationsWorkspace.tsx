"use client"

import { useState } from "react"
import { Pill } from "@/components/ui"

const STAGES = ["Courtesy notice", "Second notice", "Fine issued", "Hearing"]
const TODAY = "Oct 17"

type Violation = {
    id: string
    title: string
    home: string
    owner: string
    rule: string
    stageIdx: number
    dates: string[]
    due: string
    late: boolean
    resolved?: boolean
}

// Placeholder data until the Supabase tables exist.
const VIOLATIONS: Violation[] = [
    {
        id: "v1",
        title: "Trash bins visible from street",
        home: "14 Willow Bend Ct",
        owner: "Dana Ortega",
        rule: "CC&Rs §7.3 · Refuse storage",
        stageIdx: 0,
        dates: ["Oct 9"],
        due: "Resolve by Oct 23",
        late: false,
    },
    {
        id: "v2",
        title: "Boat parked in driveway",
        home: "22 Marsh Lane",
        owner: "Priya Natarajan",
        rule: "CC&Rs §5.1 · Vehicles",
        stageIdx: 1,
        dates: ["Sep 18", "Oct 2"],
        due: "3 days overdue",
        late: true,
    },
    {
        id: "v3",
        title: "Unapproved exterior paint color",
        home: "3 Cattail Court",
        owner: "Marcus Webb",
        rule: "Design guidelines §2.4",
        stageIdx: 2,
        dates: ["Aug 20", "Sep 5", "Sep 26"],
        due: "12 days overdue",
        late: true,
    },
    {
        id: "v4",
        title: "Lawn height over 6 inches",
        home: "41 Willow Bend Ct",
        owner: "Kai Mendes",
        rule: "CC&Rs §6.2 · Landscaping",
        stageIdx: 0,
        dates: ["Oct 12"],
        due: "Resolve by Oct 26",
        late: false,
    },
    {
        id: "v5",
        title: "Holiday lights up past Feb 1",
        home: "18 Heron Way",
        owner: "Sam Okafor",
        rule: "Rules §3.7 · Decorations",
        stageIdx: 0,
        dates: ["Oct 14"],
        due: "Resolve by Oct 28",
        late: false,
    },
]

export default function ViolationsWorkspace() {
    // Notices and resolutions update local state only until the backend exists.
    const [items, setItems] = useState(VIOLATIONS)
    const [selId, setSelId] = useState(VIOLATIONS[0].id)
    const sel = items.find((v) => v.id === selId) ?? items[0]
    const atLastStage = sel.stageIdx >= STAGES.length - 1

    function update(patch: (v: Violation) => Violation) {
        setItems((list) => list.map((v) => (v.id === sel.id ? patch(v) : v)))
    }

    return (
        <div className="split">
            <section
                className="card split-main"
                aria-label="Open violations"
                style={{ padding: 8, gap: 0 }}
            >
                {items.map((v) => {
                    const on = v.id === sel.id
                    return (
                        <button
                            key={v.id}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setSelId(v.id)}
                            className="row"
                            style={{
                                width: "100%",
                                textAlign: "left",
                                border: "none",
                                borderRadius: 12,
                                background: on
                                    ? "var(--surface-sunken)"
                                    : "var(--surface)",
                                padding: 14,
                                gap: 14,
                                color: "var(--ink)",
                                cursor: "pointer",
                                flexWrap: "wrap",
                            }}
                        >
                            <span
                                className="stack grow"
                                style={{ gap: 3, flexBasis: 200 }}
                            >
                                <span
                                    className="strong"
                                    style={{ fontSize: 15 }}
                                >
                                    {v.title}
                                </span>
                                <span className="text-sm muted">
                                    {v.home} · {v.rule}
                                </span>
                            </span>
                            <Pill tone={v.resolved ? "blue" : "gray"}>
                                {v.resolved ? "Resolved" : STAGES[v.stageIdx]}
                            </Pill>
                            <span
                                className="text-sm strong"
                                style={{
                                    width: 110,
                                    textAlign: "right",
                                    color:
                                        v.late && !v.resolved
                                            ? "var(--amber-fg)"
                                            : "var(--muted)",
                                }}
                            >
                                {v.resolved ? `Closed ${TODAY}` : v.due}
                            </span>
                        </button>
                    )
                })}
            </section>

            <section
                className="card split-side"
                aria-label="Violation detail"
                aria-live="polite"
                style={{ padding: 22, gap: 18, flexBasis: 340 }}
            >
                <div className="stack" style={{ gap: 6 }}>
                    <span className="text-sm strong muted">
                        {sel.home} · {sel.owner}
                    </span>
                    <h2 className="h2-lg" style={{ lineHeight: 1.2 }}>
                        {sel.title}
                    </h2>
                    <span className="text-md muted">{sel.rule}</span>
                </div>
                <div
                    className="text-md muted"
                    style={{
                        height: 150,
                        borderRadius: 12,
                        background: "var(--gray-bg)",
                        border: "1px dashed #b6c1cf",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    [Inspection photo]
                </div>
                <ol
                    style={{
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {STAGES.map((label, i) => {
                        const done = i <= sel.stageIdx
                        const current = i === sel.stageIdx
                        return (
                            <li
                                key={label}
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    alignItems: "flex-start",
                                    minHeight: 44,
                                }}
                                aria-current={current ? "step" : undefined}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                    }}
                                    aria-hidden="true"
                                >
                                    <span
                                        style={{
                                            width: 14,
                                            height: 14,
                                            borderRadius: 7,
                                            border: `2px solid ${done ? "var(--primary)" : "#b6c1cf"}`,
                                            background: done
                                                ? "var(--primary)"
                                                : "var(--surface)",
                                            marginTop: 3,
                                        }}
                                    />
                                    <span
                                        style={{
                                            flex: 1,
                                            width: 2,
                                            background: "var(--border)",
                                        }}
                                    />
                                </div>
                                <div
                                    className="stack"
                                    style={{ gap: 2, paddingBottom: 10 }}
                                >
                                    <span
                                        className="text-md"
                                        style={{
                                            fontWeight: current ? 700 : 500,
                                            color: done
                                                ? "var(--ink)"
                                                : "var(--muted)",
                                        }}
                                    >
                                        {label}
                                    </span>
                                    <span className="text-sm muted">
                                        {done
                                            ? `Sent ${sel.dates[i]}`
                                            : "Not yet"}
                                    </span>
                                </div>
                            </li>
                        )
                    })}
                </ol>
                {sel.resolved && (
                    <p className="callout callout-info" role="status">
                        Marked resolved {TODAY}.
                    </p>
                )}
                <div className="row-wrap" style={{ gap: 10 }}>
                    <button
                        type="button"
                        className="btn btn-primary btn-flex"
                        style={{
                            flexBasis: 140,
                            opacity: sel.resolved ? 0.5 : 1,
                        }}
                        disabled={sel.resolved}
                        onClick={() =>
                            update((v) => ({ ...v, resolved: true }))
                        }
                    >
                        Mark resolved
                    </button>
                    <button
                        type="button"
                        className="btn btn-flex"
                        style={{
                            flexBasis: 140,
                            opacity: sel.resolved || atLastStage ? 0.5 : 1,
                        }}
                        disabled={sel.resolved || atLastStage}
                        onClick={() =>
                            update((v) => ({
                                ...v,
                                stageIdx: v.stageIdx + 1,
                                dates: [...v.dates, TODAY],
                            }))
                        }
                    >
                        Send next notice
                    </button>
                </div>
            </section>
        </div>
    )
}
