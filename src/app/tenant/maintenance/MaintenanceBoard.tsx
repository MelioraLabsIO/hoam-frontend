"use client"

import { useRef, useState, type FormEvent } from "react"
import { Pill, type Tone } from "@/components/ui"

type Request = {
    id: number
    date: string
    title: string
    status: string
    tone: Tone
    note: string
}

// Placeholder data until the Supabase tables exist.
const LANDLORD = "Dana Ortega"
const HOME = "9 Heron Way"
const LOCATIONS = [
    "Common area (streets, lights, gates, pool)",
    `Outside ${HOME} (sidewalk, mailbox)`,
]
const INITIAL_REQUESTS: Request[] = [
    {
        id: 1045,
        date: "Oct 13",
        title: "Sidewalk crack in front of driveway",
        status: "Under review",
        tone: "gray",
        note: `${LANDLORD} (landlord) was copied`,
    },
    {
        id: 1001,
        date: "Aug 20",
        title: "Pool gate latch doesn't close",
        status: "Resolved",
        tone: "teal",
        note: "Fixed Aug 22",
    },
]

// Submitting isn't wired to Supabase yet; new requests are kept in local state.
export default function MaintenanceBoard() {
    const [requests, setRequests] = useState(INITIAL_REQUESTS)
    const [photos, setPhotos] = useState<string[]>([])
    const [sent, setSent] = useState<number | null>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)
        const desc = String(data.get("desc") || "").trim()
        if (!desc) return
        const id = Math.max(...requests.map((r) => r.id)) + 1
        const date = new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })
        const title = desc.length > 70 ? `${desc.slice(0, 67)}…` : desc
        setRequests([
            {
                id,
                date,
                title,
                status: "New",
                tone: "amber",
                note: `${LANDLORD} (landlord) was copied`,
            },
            ...requests,
        ])
        setSent(id)
        setPhotos([])
        form.reset()
    }

    return (
        <div className="row-wrap" style={{ gap: 16, alignItems: "flex-start" }}>
            <section
                aria-labelledby="new-h"
                className="card"
                style={{ flex: "1 1 380px", padding: 22 }}
            >
                <h2 id="new-h" className="h2">
                    Report an issue
                </h2>
                <form className="stack" style={{ gap: 14 }} onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="t-where" className="label">
                            Where is it?
                        </label>
                        <select id="t-where" name="where" className="select">
                            {LOCATIONS.map((l) => (
                                <option key={l}>{l}</option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="t-desc" className="label">
                            What&apos;s going on?
                        </label>
                        <textarea
                            id="t-desc"
                            name="desc"
                            className="textarea"
                            rows={4}
                            required
                        />
                    </div>
                    <input
                        ref={fileRef}
                        type="file"
                        name="photos"
                        accept="image/*"
                        multiple
                        className="visually-hidden"
                        tabIndex={-1}
                        aria-hidden="true"
                        onChange={(e) =>
                            setPhotos(
                                Array.from(e.target.files ?? []).map(
                                    (f) => f.name
                                )
                            )
                        }
                    />
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        style={{
                            height: 64,
                            borderRadius: 12,
                            border: "1px dashed #B6C1CF",
                            background: "var(--surface-muted)",
                            color: "var(--muted)",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        {photos.length
                            ? `${photos.length} photo${photos.length > 1 ? "s" : ""} added`
                            : "Add photos"}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ height: 48, fontSize: 16 }}
                    >
                        Send to management
                    </button>
                    {sent && (
                        <p className="callout callout-info" role="status">
                            Request #{sent} sent. {LANDLORD} was copied.
                        </p>
                    )}
                    <p className="text-sm muted" style={{ lineHeight: 1.45 }}>
                        Problems inside the home go to your landlord, not the
                        HOA. Changes to the outside of the home need your
                        landlord to request approval.
                    </p>
                </form>
            </section>

            <section
                className="stack"
                style={{ flex: "999 1 480px", minWidth: 0 }}
            >
                <h2 className="h2">Your requests</h2>
                {requests.map((r) => (
                    <article
                        key={r.id}
                        className="card card-tight"
                        style={{ padding: 18, gap: 8 }}
                    >
                        <div
                            className="row-wrap"
                            style={{ justifyContent: "space-between", gap: 8 }}
                        >
                            <span className="text-sm strong muted">
                                #{r.id} · {r.date}
                            </span>
                            <Pill tone={r.tone}>{r.status}</Pill>
                        </div>
                        <span className="text-lg strong">{r.title}</span>
                        <span className="text-md muted">{r.note}</span>
                    </article>
                ))}
            </section>
        </div>
    )
}
