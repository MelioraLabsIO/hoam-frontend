"use client"

import { useState, type FormEvent } from "react"

// Posting isn't wired to Supabase yet; the form confirms locally.
export default function QuickAnnouncement() {
    const [posted, setPosted] = useState<string | null>(null)

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setPosted(String(data.get("title") || "Announcement"))
        e.currentTarget.reset()
    }

    return (
        <section className="card">
            <h2 className="h2">Quick announcement</h2>
            <form className="stack" style={{ gap: 14 }} onSubmit={onSubmit}>
                <div className="field">
                    <label htmlFor="ann-title" className="label">
                        Title
                    </label>
                    <input
                        id="ann-title"
                        name="title"
                        className="input"
                        placeholder="e.g. Gate codes changing Nov 4"
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="ann-body" className="label">
                        Message
                    </label>
                    <textarea
                        id="ann-body"
                        name="body"
                        className="textarea"
                        rows={3}
                    />
                </div>
                <div
                    className="row-wrap"
                    style={{ justifyContent: "space-between" }}
                >
                    <label className="check">
                        <input type="checkbox" name="push" defaultChecked />
                        Send push notification to all residents
                    </label>
                    <button type="submit" className="btn btn-primary">
                        Post
                    </button>
                </div>
                {posted && (
                    <p className="callout callout-info" role="status">
                        “{posted}” is ready to post once announcements are
                        connected.
                    </p>
                )}
            </form>
        </section>
    )
}
