"use client"

import { useState } from "react"
import Switch from "../_components/Switch"

// Placeholder data until the Supabase tables exist.
const HOMES = [
    { id: "a", address: "14 Willow Bend Ct", note: "You live here" },
    {
        id: "b",
        address: "9 Heron Way",
        note: "Rented · tenant does not see this",
    },
]
const AMOUNT = 285

export default function DuesPayment() {
    const [picked, setPicked] = useState<Record<string, boolean>>({
        a: true,
        b: true,
    })
    const [autopay, setAutopay] = useState(false)
    const [paid, setPaid] = useState<string | null>(null)

    const n = HOMES.filter((h) => picked[h.id]).length
    const total = `$${(n * AMOUNT).toFixed(2)}`

    return (
        <div className="split">
            <section
                className="card split-main"
                style={{ padding: 22, gap: 16 }}
            >
                <h2 className="h2">Q4 2026 · due Nov 1</h2>
                {HOMES.map((h) => {
                    const on = !!picked[h.id]
                    return (
                        <label
                            key={h.id}
                            className="row"
                            style={{
                                alignItems: "flex-start",
                                gap: 14,
                                padding: on ? 13 : 14,
                                borderRadius: 14,
                                border: on
                                    ? "2px solid var(--primary)"
                                    : "1px solid var(--border)",
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={on}
                                onChange={() => {
                                    setPaid(null)
                                    setPicked({ ...picked, [h.id]: !on })
                                }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    margin: "2px 0 0",
                                    accentColor: "var(--primary)",
                                }}
                            />
                            <div className="stack grow" style={{ gap: 6 }}>
                                <div className="spread">
                                    <span
                                        className="strong"
                                        style={{ fontSize: 16 }}
                                    >
                                        {h.address}
                                    </span>
                                    <span
                                        className="bold"
                                        style={{ fontSize: 16 }}
                                    >
                                        $285.00
                                    </span>
                                </div>
                                <span className="text-md muted">
                                    Assessment $265.00 · Reserve fund $20.00 ·{" "}
                                    {h.note}
                                </span>
                            </div>
                        </label>
                    )
                })}
                <div
                    className="row-wrap"
                    style={{
                        justifyContent: "space-between",
                        gap: 12,
                        paddingTop: 14,
                        borderTop: "1px solid var(--divider)",
                    }}
                >
                    <div className="stack" style={{ gap: 2 }}>
                        <span className="text-md muted">
                            Paying from Bank account ••4821 ·{" "}
                            <a href="#" className="strong">
                                Change
                            </a>
                        </span>
                        <span className="display" style={{ fontSize: 30 }}>
                            {total}
                        </span>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={n === 0}
                        onClick={() =>
                            setPaid(
                                `Payment of ${total} is ready to send once payments are connected.`
                            )
                        }
                        style={{
                            height: 52,
                            padding: "0 28px",
                            borderRadius: 14,
                            fontSize: 17,
                            ...(n === 0
                                ? {
                                      background: "#9aa6b8",
                                      cursor: "not-allowed",
                                  }
                                : {}),
                        }}
                    >
                        {n === 0
                            ? "Select a home"
                            : `Pay ${n} ${n === 1 ? "home" : "homes"}`}
                    </button>
                </div>
                {paid && (
                    <p className="callout callout-info" role="status">
                        {paid}
                    </p>
                )}
            </section>

            <aside className="split-side stack" style={{ gap: 16 }}>
                <section
                    className="card row"
                    style={{
                        padding: 18,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 14,
                    }}
                >
                    <label
                        htmlFor="autopay"
                        className="stack grow"
                        style={{ gap: 3, cursor: "pointer" }}
                    >
                        <span className="strong" style={{ fontSize: 16 }}>
                            Autopay
                        </span>
                        <span className="text-md muted">
                            {autopay
                                ? "On for both homes · pays on the due date"
                                : "Off · never miss a due date"}
                        </span>
                    </label>
                    <Switch
                        id="autopay"
                        checked={autopay}
                        onChange={setAutopay}
                    />
                </section>
                <section className="card" style={{ padding: 18, gap: 10 }}>
                    <h2 className="h3">Statements</h2>
                    <a href="#" className="strong">
                        2026 year-to-date (PDF)
                    </a>
                    <a href="#" className="strong">
                        2025 annual statement (PDF)
                    </a>
                    <a href="#" className="strong">
                        Request a payoff letter
                    </a>
                </section>
            </aside>
        </div>
    )
}
