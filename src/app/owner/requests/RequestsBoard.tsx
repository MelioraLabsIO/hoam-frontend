"use client"

import { useState, type FormEvent } from "react"
import { Pill, type Tone } from "@/components/ui"

type Kind = "maint" | "arch"
type Req = {
    kind: Kind
    id: string
    home: string
    title: string
    status: string
    tone: Tone
    note: string
}

// Placeholder data until the Supabase tables exist.
const REQUESTS: Req[] = [
    {
        kind: "maint",
        id: "#1042",
        home: "14 Willow Bend Ct",
        title: "Streetlight out near mailbox cluster B",
        status: "Vendor booked",
        tone: "teal",
        note: "Scheduled Oct 17 · updated today",
    },
    {
        kind: "maint",
        id: "#1045",
        home: "9 Heron Way",
        title: "Sidewalk crack in front of driveway",
        status: "Under review",
        tone: "gray",
        note: "Submitted by your tenant Jordan Lee · you were copied",
    },
    {
        kind: "maint",
        id: "#1019",
        home: "14 Willow Bend Ct",
        title: "Sprinkler head broken by the pond path",
        status: "Resolved",
        tone: "blue",
        note: "Closed Sep 30",
    },
    {
        kind: "arch",
        id: "#1038",
        home: "14 Willow Bend Ct",
        title: "Replace front fence with 4 ft cedar",
        status: "Board vote Oct 24",
        tone: "gray",
        note: "2 photos and a site plan attached",
    },
    {
        kind: "arch",
        id: "#1012",
        home: "9 Heron Way",
        title: "Repaint shutters, Hale Navy",
        status: "Approved",
        tone: "blue",
        note: "Approved Aug 14 · valid for 6 months",
    },
]

const TABS: { id: Kind; label: string }[] = [
    { id: "maint", label: "Maintenance" },
    { id: "arch", label: "Architectural approvals" },
]

export default function RequestsBoard() {
    const [tab, setTab] = useState<Kind>("maint")
    const [submitted, setSubmitted] = useState(false)
    const items = REQUESTS.filter((r) => r.kind === tab)

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSubmitted(true)
        e.currentTarget.reset()
    }

    return (
        <div className="split">
            <section className="split-main stack" aria-label="Your requests">
                <div
                    role="tablist"
                    aria-label="Request type"
                    className="tabs"
                    style={{ alignSelf: "flex-start" }}
                >
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            role="tab"
                            id={`tab-${t.id}`}
                            aria-selected={tab === t.id}
                            aria-controls="request-list"
                            className="tab"
                            onClick={() => setTab(t.id)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                <div
                    id="request-list"
                    role="tabpanel"
                    aria-labelledby={`tab-${tab}`}
                    className="stack"
                >
                    {items.map((r) => (
                        <article
                            key={r.id}
                            className="card card-tight"
                            style={{ padding: 18, gap: 8 }}
                        >
                            <div
                                className="row-wrap"
                                style={{
                                    justifyContent: "space-between",
                                    gap: 8,
                                }}
                            >
                                <span className="text-sm strong muted">
                                    {r.id} · {r.home}
                                </span>
                                <Pill tone={r.tone}>{r.status}</Pill>
                            </div>
                            <span
                                className="text-lg strong"
                                style={{ lineHeight: 1.3 }}
                            >
                                {r.title}
                            </span>
                            <span className="text-md muted">{r.note}</span>
                        </article>
                    ))}
                </div>
            </section>

            <section
                aria-labelledby="new-h"
                className="card split-side"
                style={{ padding: 22, flexBasis: 340 }}
            >
                <h2 id="new-h" className="h2">
                    New request
                </h2>
                <form className="stack" style={{ gap: 14 }} onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="r-home" className="label">
                            Home
                        </label>
                        <select id="r-home" name="home" className="select">
                            <option>14 Willow Bend Ct</option>
                            <option>9 Heron Way</option>
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="r-type" className="label">
                            Type
                        </label>
                        <select id="r-type" name="type" className="select">
                            <option>Maintenance (common area)</option>
                            <option>Architectural change to my home</option>
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="r-desc" className="label">
                            What&apos;s going on?
                        </label>
                        <textarea
                            id="r-desc"
                            name="description"
                            className="textarea"
                            rows={4}
                            required
                        />
                    </div>
                    <label
                        className="btn"
                        style={{
                            height: 64,
                            border: "1px dashed #b6c1cf",
                            background: "var(--surface-muted)",
                            color: "var(--muted)",
                            fontSize: 14,
                        }}
                    >
                        Add photos or plans
                        <input
                            type="file"
                            name="files"
                            accept="image/*,application/pdf"
                            multiple
                            className="visually-hidden"
                        />
                    </label>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ height: 48, fontSize: 16 }}
                    >
                        Submit request
                    </button>
                    {submitted && (
                        <p className="callout callout-info" role="status">
                            Your request is ready to send once requests are
                            connected.
                        </p>
                    )}
                </form>
            </section>
        </div>
    )
}
