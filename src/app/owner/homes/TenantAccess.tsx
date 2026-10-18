"use client"

import { useState } from "react"
import { Pill } from "@/components/ui"
import Switch from "../_components/Switch"

type PermId = "book" | "maint" | "news" | "gate"

// Placeholder data until the Supabase tables exist.
const PERMS: { id: PermId; label: string; note: string }[] = [
    { id: "book", label: "Book amenities", note: "Clubhouse, courts and pool" },
    {
        id: "maint",
        label: "Submit maintenance requests",
        note: "You get a copy of each one",
    },
    {
        id: "news",
        label: "Get community announcements",
        note: "All-resident posts only",
    },
    {
        id: "gate",
        label: "Gate and pool access codes",
        note: "Shown in their portal",
    },
]

export default function TenantAccess() {
    const [perms, setPerms] = useState<Record<PermId, boolean>>({
        book: true,
        maint: true,
        news: true,
        gate: false,
    })

    return (
        <section
            className="card"
            style={{ flex: "1 1 380px", padding: 22, gap: 16 }}
        >
            <div
                className="row-wrap"
                style={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 8,
                }}
            >
                <div className="stack" style={{ gap: 4 }}>
                    <h2 className="h2-lg">9 Heron Way</h2>
                    <span className="text-md muted">Lot 12 · townhome</span>
                </div>
                <Pill tone="teal">
                    <span className="bold">Rented</span>
                </Pill>
            </div>

            <div
                className="row"
                style={{
                    padding: 14,
                    borderRadius: 14,
                    background: "var(--surface-muted)",
                }}
            >
                <span
                    className="avatar"
                    style={{
                        width: 44,
                        height: 44,
                        background: "var(--teal)",
                        fontSize: 15,
                    }}
                    aria-hidden="true"
                >
                    JL
                </span>
                <div className="stack grow" style={{ gap: 2 }}>
                    <span className="strong" style={{ fontSize: 16 }}>
                        Jordan Lee
                    </span>
                    <span className="text-sm muted">
                        Lease Aug 1, 2025 – Jul 31, 2027 · joined the tenant
                        portal
                    </span>
                </div>
            </div>

            <div className="stack" style={{ gap: 2 }}>
                <h3 className="text-md strong" style={{ paddingBottom: 4 }}>
                    What Jordan can do
                </h3>
                {PERMS.map((p) => (
                    <div
                        key={p.id}
                        className="list-row"
                        style={{
                            padding: "10px 0",
                            borderBottom: "1px solid var(--divider)",
                        }}
                    >
                        <div className="stack grow" style={{ gap: 2 }}>
                            <span className="strong">{p.label}</span>
                            <span className="text-sm muted">{p.note}</span>
                        </div>
                        <Switch
                            label={p.label}
                            checked={perms[p.id]}
                            onChange={(v) => setPerms({ ...perms, [p.id]: v })}
                            onColor="var(--teal)"
                        />
                    </div>
                ))}
                <span className="text-sm muted" style={{ paddingTop: 8 }}>
                    Dues, violations and votes always stay with you. Tenants
                    never see them.
                </span>
            </div>

            <div className="row-wrap">
                <button
                    type="button"
                    className="btn"
                    style={{ flex: "1 1 140px" }}
                >
                    Upload lease
                </button>
                <button
                    type="button"
                    className="btn"
                    style={{ flex: "1 1 140px", color: "var(--amber-fg)" }}
                >
                    End tenancy
                </button>
            </div>
        </section>
    )
}
