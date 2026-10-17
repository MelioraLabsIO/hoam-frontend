"use client"

import { useState } from "react"
import { SearchIcon } from "@/components/icons"
import { Pill } from "@/components/ui"

type Household = {
    home: string
    names: string
    email: string
    type: "Owner" | "Renter"
    due: number
    past: boolean
    autopay: boolean
    app: "Active" | "Invited" | "Not invited"
}

// Placeholder data until the Supabase tables exist.
const HOUSEHOLDS: Household[] = [
    {
        home: "14 Willow Bend Ct",
        names: "Dana & Luis Ortega",
        email: "dana.ortega@example.com",
        type: "Owner",
        due: 285,
        past: false,
        autopay: false,
        app: "Active",
    },
    {
        home: "22 Marsh Lane",
        names: "Priya Natarajan",
        email: "priya.n@example.com",
        type: "Owner",
        due: 570,
        past: true,
        autopay: false,
        app: "Active",
    },
    {
        home: "3 Cattail Court",
        names: "Marcus Webb",
        email: "mwebb@example.com",
        type: "Owner",
        due: 310,
        past: true,
        autopay: false,
        app: "Invited",
    },
    {
        home: "7 Heron Way",
        names: "Helen & Tom Fischer",
        email: "fischers@example.com",
        type: "Owner",
        due: 0,
        past: false,
        autopay: true,
        app: "Active",
    },
    {
        home: "9 Heron Way",
        names: "Jordan Lee (tenant)",
        email: "jlee@example.com",
        type: "Renter",
        due: 0,
        past: false,
        autopay: true,
        app: "Active",
    },
    {
        home: "18 Heron Way",
        names: "Sam Okafor",
        email: "sam.okafor@example.com",
        type: "Owner",
        due: 285,
        past: true,
        autopay: false,
        app: "Not invited",
    },
    {
        home: "30 Marsh Lane",
        names: "Ruth Abernathy",
        email: "ruth.a@example.com",
        type: "Owner",
        due: 0,
        past: false,
        autopay: true,
        app: "Active",
    },
    {
        home: "41 Willow Bend Ct",
        names: "Kai Mendes (tenant)",
        email: "kai.m@example.com",
        type: "Renter",
        due: 285,
        past: true,
        autopay: false,
        app: "Active",
    },
]

const TOTAL_HOMES = 228

const FILTERS: {
    id: string
    label: string
    test: (h: Household) => boolean
}[] = [
    { id: "all", label: "All homes", test: () => true },
    { id: "past", label: "Past due", test: (h) => h.past },
    { id: "noauto", label: "Autopay off", test: (h) => !h.autopay },
    { id: "rent", label: "Renters", test: (h) => h.type === "Renter" },
]

function Balance({ h }: { h: Household }) {
    if (h.due === 0) return <Pill tone="blue">Paid up</Pill>
    const amount = `$${h.due.toFixed(2)}`
    return h.past ? (
        <Pill tone="amber">Past due {amount}</Pill>
    ) : (
        <Pill>Due {amount}</Pill>
    )
}

export default function ResidentsDirectory() {
    const [filter, setFilter] = useState("all")
    const [query, setQuery] = useState("")

    const current = FILTERS.find((f) => f.id === filter) ?? FILTERS[0]
    const q = query.trim().toLowerCase()
    const rows = HOUSEHOLDS.filter(current.test).filter(
        (h) =>
            !q ||
            [h.home, h.names, h.email].some((v) => v.toLowerCase().includes(q))
    )

    return (
        <>
            <div className="row-wrap" style={{ gap: 12 }}>
                <div
                    className="search"
                    style={{ flex: "1 1 280px", maxWidth: 420 }}
                >
                    <label htmlFor="res-search" className="visually-hidden">
                        Search households
                    </label>
                    <SearchIcon size={18} />
                    <input
                        id="res-search"
                        type="search"
                        className="input"
                        style={{ borderRadius: 12 }}
                        placeholder="Search name, address or email"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div
                    role="group"
                    aria-label="Filter"
                    className="row-wrap"
                    style={{ gap: 8 }}
                >
                    {FILTERS.map((f) => {
                        const on = f.id === current.id
                        return (
                            <button
                                key={f.id}
                                type="button"
                                className="btn"
                                aria-pressed={on}
                                onClick={() => setFilter(f.id)}
                                style={{
                                    borderRadius: 22,
                                    padding: "0 14px",
                                    fontSize: 14,
                                    ...(on
                                        ? {
                                              background: "var(--nav-bg)",
                                              borderColor: "var(--nav-bg)",
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
            </div>

            <section
                className="card"
                style={{ padding: "8px 20px 12px", gap: 0 }}
            >
                <div className="table-wrap">
                    <table className="table" style={{ minWidth: 760 }}>
                        <thead>
                            <tr>
                                <th style={{ paddingTop: 14 }}>Home</th>
                                <th style={{ paddingTop: 14 }}>Residents</th>
                                <th style={{ paddingTop: 14 }}>Type</th>
                                <th style={{ paddingTop: 14 }}>Balance</th>
                                <th style={{ paddingTop: 14 }}>Autopay</th>
                                <th style={{ paddingTop: 14 }}>App</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((h) => (
                                <tr key={h.home}>
                                    <td className="strong">{h.home}</td>
                                    <td>
                                        <div
                                            className="stack"
                                            style={{ gap: 2 }}
                                        >
                                            <span>{h.names}</span>
                                            <span className="text-sm muted">
                                                {h.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="muted">{h.type}</td>
                                    <td>
                                        <Balance h={h} />
                                    </td>
                                    <td className="muted">
                                        {h.autopay ? "On" : "Off"}
                                    </td>
                                    <td className="muted">{h.app}</td>
                                </tr>
                            ))}
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="muted">
                                        No households match.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div
                    className="row-wrap text-md muted"
                    style={{
                        justifyContent: "space-between",
                        gap: 12,
                        paddingTop: 12,
                    }}
                >
                    <span role="status">
                        Showing {rows.length} of {TOTAL_HOMES} homes
                    </span>
                    <div className="row" style={{ gap: 8 }}>
                        <button
                            type="button"
                            className="btn"
                            style={{
                                borderRadius: 10,
                                fontSize: 14,
                                padding: "0 14px",
                            }}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            className="btn"
                            style={{
                                borderRadius: 10,
                                fontSize: 14,
                                padding: "0 14px",
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
