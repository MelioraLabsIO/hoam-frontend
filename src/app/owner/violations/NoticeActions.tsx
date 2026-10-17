"use client"

import { useState } from "react"

const ACTIONS = [
    {
        id: "fixed",
        label: "Mark fixed with a photo",
        primary: true,
        done: "Upload a photo of the fix once notices are connected.",
    },
    {
        id: "reply",
        label: "Reply to the board",
        done: "Replies to the board open here once notices are connected.",
    },
    {
        id: "hearing",
        label: "Request a hearing",
        done: "Hearing requests are sent once notices are connected.",
    },
]

// Notice actions aren't wired to Supabase yet; they confirm locally.
export default function NoticeActions() {
    const [message, setMessage] = useState<string | null>(null)
    return (
        <>
            <div className="row-wrap">
                {ACTIONS.map((a) => (
                    <button
                        key={a.id}
                        type="button"
                        className={a.primary ? "btn btn-primary" : "btn"}
                        style={{ flex: "1 1 160px", height: 48 }}
                        onClick={() => setMessage(a.done)}
                    >
                        {a.label}
                    </button>
                ))}
            </div>
            {message && (
                <p className="callout callout-info" role="status">
                    {message}
                </p>
            )}
        </>
    )
}
