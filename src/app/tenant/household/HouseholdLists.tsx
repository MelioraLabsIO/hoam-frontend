"use client"

import { useState, type FormEvent } from "react"

type Entry = { name: string; detail: string }

// Placeholder data until the Supabase tables exist.
const PEOPLE: Entry[] = [
    { name: "Jordan Lee", detail: "Leaseholder" },
    { name: "Alex Lee", detail: "Occupant" },
]
const VEHICLES: Entry[] = [{ name: "Gray Honda CR-V", detail: "Plate [PLATE]" }]
const PETS: Entry[] = [{ name: "Biscuit", detail: "Dog · beagle" }]

/**
 * A list card whose "add" link opens a small inline form.
 * Saving isn't wired to Supabase yet; additions live in local state.
 */
function EntryCard({
    id,
    title,
    initial,
    addLabel,
    nameLabel,
    detailLabel,
    format,
    note,
}: {
    id: string
    title: string
    initial: Entry[]
    addLabel: string
    nameLabel: string
    detailLabel: string
    format: (detail: string) => string
    note?: string
}) {
    const [entries, setEntries] = useState(initial)
    const [adding, setAdding] = useState(false)

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const name = String(data.get("name") || "").trim()
        const detail = String(data.get("detail") || "").trim()
        if (!name) return
        setEntries([...entries, { name, detail: format(detail) }])
        setAdding(false)
    }

    return (
        <section className="card" style={{ gap: 12 }}>
            <h2 className="h2">{title}</h2>
            <div className="stack" style={{ gap: 0 }}>
                {entries.map((en, i) => (
                    <div
                        key={en.name + i}
                        className="spread"
                        style={{
                            padding: "10px 0",
                            borderBottom: "1px solid var(--divider)",
                            alignItems: "center",
                        }}
                    >
                        <span className="strong">{en.name}</span>
                        <span className="muted">{en.detail}</span>
                    </div>
                ))}
            </div>
            {adding ? (
                <form className="stack" style={{ gap: 10 }} onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor={`${id}-name`} className="label">
                            {nameLabel}
                        </label>
                        <input
                            id={`${id}-name`}
                            name="name"
                            className="input"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="field">
                        <label htmlFor={`${id}-detail`} className="label">
                            {detailLabel}
                        </label>
                        <input
                            id={`${id}-detail`}
                            name="detail"
                            className="input"
                        />
                    </div>
                    <div className="row-wrap">
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm"
                            onClick={() => setAdding(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    type="button"
                    className="link-strong"
                    onClick={() => setAdding(true)}
                    style={{
                        alignSelf: "flex-start",
                        padding: 0,
                        border: "none",
                        background: "none",
                        color: "var(--primary)",
                        cursor: "pointer",
                    }}
                >
                    {addLabel}
                </button>
            )}
            {note && <span className="text-sm muted">{note}</span>}
        </section>
    )
}

export default function HouseholdLists({
    landlordFirst,
}: {
    landlordFirst: string
}) {
    const [askedAccess, setAskedAccess] = useState(false)

    return (
        <>
            <EntryCard
                id="person"
                title="People"
                initial={PEOPLE}
                addLabel="Add someone who lives here"
                nameLabel="Full name"
                detailLabel="Relationship"
                format={(d) => d || "Occupant"}
            />
            <EntryCard
                id="vehicle"
                title="Vehicles"
                initial={VEHICLES}
                addLabel="Register a vehicle"
                nameLabel="Color, make and model"
                detailLabel="License plate"
                format={(d) =>
                    d ? `Plate ${d.toUpperCase()}` : "No plate on file"
                }
                note="Registered vehicles won't be flagged by patrol."
            />
            <EntryCard
                id="pet"
                title="Pets"
                initial={PETS}
                addLabel="Register a pet"
                nameLabel="Pet's name"
                detailLabel="Type and breed"
                format={(d) => d || "Pet"}
            />
            <section className="card" style={{ gap: 10 }}>
                <h2 className="h2">Gate &amp; pool access</h2>
                <span className="lead">
                    Your landlord hasn&apos;t shared access codes in the portal
                    yet. Ask {landlordFirst} for the current codes.
                </span>
                {askedAccess ? (
                    <p className="callout callout-info" role="status">
                        We&apos;ll let {landlordFirst} know you asked for access
                        codes.
                    </p>
                ) : (
                    <button
                        type="button"
                        className="link-strong"
                        onClick={() => setAskedAccess(true)}
                        style={{
                            alignSelf: "flex-start",
                            padding: 0,
                            border: "none",
                            background: "none",
                            color: "var(--primary)",
                            cursor: "pointer",
                        }}
                    >
                        Ask for access
                    </button>
                )}
            </section>
        </>
    )
}
