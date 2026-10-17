"use client"

import { useState, type FormEvent } from "react"
import { Pill, type Tone } from "@/components/ui"

type Status = "pinned" | "scheduled" | "sent" | "draft"
type Post = {
    id: number
    status: Status
    scheduledFor?: string
    audience: string
    date: string
    channels: string
    title: string
    body?: string
    seen?: number
}

const RESIDENTS = 412

// Placeholder data until the Supabase tables exist.
const INITIAL_POSTS: Post[] = [
    {
        id: 1,
        status: "pinned",
        audience: "All residents",
        date: "Oct 12",
        channels: "Push + email",
        title: "Pool resurfacing starts Oct 21 — closed for two weeks",
        body: "The clubhouse stays open. Gate codes reset on reopening; new codes will be posted here.",
        seen: 301,
    },
    {
        id: 2,
        status: "scheduled",
        scheduledFor: "Oct 20",
        audience: "Owners only",
        date: "Oct 20",
        channels: "Email",
        title: "Proxy forms due before the annual meeting",
        body: "Can't attend on Nov 12? Assign a proxy from the Documents tab so your vote counts.",
    },
    {
        id: 3,
        status: "sent",
        audience: "All residents",
        date: "Oct 13",
        channels: "Push",
        title: "Annual meeting agenda posted",
        seen: 244,
    },
    {
        id: 4,
        status: "sent",
        audience: "All residents",
        date: "Oct 10",
        channels: "In app only",
        title: "Leaf pickup moves to Thursdays",
        seen: 198,
    },
]

const TODAY = "Oct 17"

const STATUS_ORDER: Record<Status, number> = {
    pinned: 0,
    draft: 1,
    scheduled: 2,
    sent: 3,
}

function statusPill(p: Post): { label: string; tone: Tone } {
    switch (p.status) {
        case "pinned":
            return { label: "Pinned", tone: "amber" }
        case "scheduled":
            return {
                label: `Scheduled ${p.scheduledFor ?? ""}`.trim(),
                tone: "teal",
            }
        case "draft":
            return { label: "Draft", tone: "gray" }
        default:
            return { label: "Sent", tone: "blue" }
    }
}

const linkButton = {
    padding: 0,
    border: "none",
    background: "none",
    color: "var(--primary)",
    font: "inherit",
    fontWeight: 600,
    cursor: "pointer",
} as const

export default function AnnouncementsBoard() {
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
    const [notice, setNotice] = useState<string | null>(null)

    const sorted = [...posts].sort(
        (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
    )

    function update(id: number, patch: Partial<Post>) {
        setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)))
    }

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const submitter = (e.nativeEvent as SubmitEvent)
            .submitter as HTMLButtonElement | null
        const isDraft = submitter?.value === "draft"
        const data = new FormData(form)
        const title = String(data.get("title") ?? "").trim()
        if (!title) return
        const push = data.get("push") === "on"
        const email = data.get("email") === "on"
        const pin = data.get("pin") === "on"
        const later = data.get("when") === "later"
        const channels =
            push && email
                ? "Push + email"
                : push
                  ? "Push"
                  : email
                    ? "Email"
                    : "In app only"
        const status: Status = isDraft
            ? "draft"
            : later
              ? "scheduled"
              : pin
                ? "pinned"
                : "sent"

        setPosts((ps) => [
            {
                id: Date.now(),
                status,
                scheduledFor: later ? "later" : undefined,
                audience: String(data.get("audience")),
                date: TODAY,
                channels,
                title,
                body: String(data.get("body") ?? "").trim() || undefined,
                seen: status === "sent" || status === "pinned" ? 0 : undefined,
            },
            ...(status === "pinned"
                ? ps.map((p) =>
                      p.status === "pinned"
                          ? { ...p, status: "sent" as const }
                          : p
                  )
                : ps),
        ])
        setNotice(
            isDraft
                ? `Saved “${title}” as a draft.`
                : `“${title}” added to the feed. Delivery starts once announcements are connected.`
        )
        form.reset()
    }

    return (
        <div className="split">
            <section
                className="split-main stack"
                aria-label="Posted and scheduled announcements"
            >
                {sorted.map((p) => {
                    const pill = statusPill(p)
                    return (
                        <article
                            className="card card-tight"
                            style={{ padding: 18, gap: 8 }}
                            key={p.id}
                        >
                            <div className="row-wrap" style={{ gap: 8 }}>
                                <Pill tone={pill.tone}>{pill.label}</Pill>
                                <span className="text-sm muted">
                                    {[
                                        p.audience,
                                        p.status === "scheduled"
                                            ? null
                                            : p.date,
                                        p.channels,
                                    ]
                                        .filter(Boolean)
                                        .join(" · ")}
                                </span>
                            </div>
                            <h2
                                className="text-lg strong"
                                style={{ margin: 0 }}
                            >
                                {p.title}
                            </h2>
                            {p.body && (
                                <p
                                    className="text-md muted"
                                    style={{ lineHeight: 1.45 }}
                                >
                                    {p.body}
                                </p>
                            )}
                            <div
                                className="row-wrap text-sm muted"
                                style={{ gap: 16, paddingTop: 4 }}
                            >
                                {p.seen !== undefined && (
                                    <span>
                                        Seen by {p.seen} of {RESIDENTS}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    style={linkButton}
                                    onClick={() =>
                                        setNotice(
                                            `Editing “${p.title}” is coming soon.`
                                        )
                                    }
                                >
                                    Edit
                                </button>
                                {p.status === "pinned" && (
                                    <button
                                        type="button"
                                        style={linkButton}
                                        onClick={() =>
                                            update(p.id, { status: "sent" })
                                        }
                                    >
                                        Unpin
                                    </button>
                                )}
                                {(p.status === "scheduled" ||
                                    p.status === "draft") && (
                                    <button
                                        type="button"
                                        style={linkButton}
                                        onClick={() =>
                                            update(p.id, {
                                                status: "sent",
                                                date: TODAY,
                                                seen: 0,
                                            })
                                        }
                                    >
                                        Send now
                                    </button>
                                )}
                            </div>
                        </article>
                    )
                })}
            </section>

            <section
                aria-labelledby="compose-h"
                className="card split-side"
                style={{ padding: 22, gap: 16, flexBasis: 360 }}
            >
                <h2 id="compose-h" className="h2">
                    New announcement
                </h2>
                <form className="stack" style={{ gap: 16 }} onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="a-title" className="label">
                            Title
                        </label>
                        <input
                            id="a-title"
                            name="title"
                            type="text"
                            className="input"
                            placeholder="e.g. Gate codes changing Nov 4"
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="a-body" className="label">
                            Message
                        </label>
                        <textarea
                            id="a-body"
                            name="body"
                            rows={5}
                            className="textarea"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="a-aud" className="label">
                            Audience
                        </label>
                        <select id="a-aud" name="audience" className="select">
                            <option>All residents</option>
                            <option>Owners only</option>
                            <option>Renters only</option>
                            <option>One street…</option>
                        </select>
                    </div>
                    <fieldset
                        className="stack"
                        style={{
                            margin: 0,
                            padding: 0,
                            border: "none",
                            gap: 0,
                        }}
                    >
                        <legend
                            className="label"
                            style={{ padding: "0 0 6px" }}
                        >
                            Also send by
                        </legend>
                        <label
                            className="check"
                            style={{ minHeight: 36, fontSize: 15 }}
                        >
                            <input type="checkbox" name="push" defaultChecked />
                            Push notification
                        </label>
                        <label
                            className="check"
                            style={{ minHeight: 36, fontSize: 15 }}
                        >
                            <input type="checkbox" name="email" />
                            Email
                        </label>
                        <label
                            className="check"
                            style={{ minHeight: 36, fontSize: 15 }}
                        >
                            <input type="checkbox" name="pin" />
                            Pin to top of the feed
                        </label>
                    </fieldset>
                    <fieldset
                        className="stack"
                        style={{
                            margin: 0,
                            padding: 0,
                            border: "none",
                            gap: 0,
                        }}
                    >
                        <legend
                            className="label"
                            style={{ padding: "0 0 6px" }}
                        >
                            When
                        </legend>
                        <label
                            className="check"
                            style={{ minHeight: 36, fontSize: 15 }}
                        >
                            <input
                                type="radio"
                                name="when"
                                value="now"
                                defaultChecked
                            />
                            Post now
                        </label>
                        <label
                            className="check"
                            style={{ minHeight: 36, fontSize: 15 }}
                        >
                            <input type="radio" name="when" value="later" />
                            Schedule for later
                        </label>
                    </fieldset>
                    <div className="row" style={{ gap: 10 }}>
                        <button
                            type="submit"
                            name="intent"
                            value="draft"
                            className="btn btn-flex"
                        >
                            Save draft
                        </button>
                        <button
                            type="submit"
                            name="intent"
                            value="post"
                            className="btn btn-primary btn-flex"
                        >
                            Post
                        </button>
                    </div>
                    {notice && (
                        <p className="callout callout-info" role="status">
                            {notice}
                        </p>
                    )}
                </form>
            </section>
        </div>
    )
}
