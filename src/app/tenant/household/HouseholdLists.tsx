"use client"

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useState, type FormEvent } from "react"

type Entry = { name: string; detail: string }

// Placeholder data until the Supabase tables exist.
const PEOPLE: Entry[] = [
    { name: "Jordan Lee", detail: "Leaseholder" },
    { name: "Alex Lee", detail: "Occupant" },
]
const VEHICLES: Entry[] = [{ name: "Gray Honda CR-V", detail: "Plate [PLATE]" }]
const PETS: Entry[] = [{ name: "Biscuit", detail: "Dog · beagle" }]

/** Text button styled like a bold link, flush with the card's left edge. */
const linkButtonSx = {
    alignSelf: "flex-start",
    p: 0,
    typography: "label",
} as const

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
        <Card component="section" sx={{ gap: 1.5 }}>
            <Typography variant="h4" component="h2">
                {title}
            </Typography>
            <Stack>
                {entries.map((en, i) => (
                    <Stack
                        key={en.name + i}
                        direction="row"
                        sx={{
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1.5,
                            py: 1.25,
                            borderBottom: 1,
                            borderColor: "divider",
                        }}
                    >
                        <Typography sx={{ fontWeight: "fontWeightSemiBold" }}>
                            {en.name}
                        </Typography>
                        <Typography color="text.secondary">
                            {en.detail}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
            {adding ? (
                <Stack component="form" sx={{ gap: 1.25 }} onSubmit={onSubmit}>
                    <TextField
                        id={`${id}-name`}
                        name="name"
                        label={nameLabel}
                        required
                        autoFocus
                    />
                    <TextField
                        id={`${id}-detail`}
                        name="detail"
                        label={detailLabel}
                    />
                    <Stack
                        direction="row"
                        sx={{ flexWrap: "wrap", alignItems: "center", gap: 1.25 }}
                    >
                        <Button type="submit" variant="contained" size="small">
                            Save
                        </Button>
                        <Button size="small" onClick={() => setAdding(false)}>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            ) : (
                <Button
                    variant="text"
                    onClick={() => setAdding(true)}
                    sx={linkButtonSx}
                >
                    {addLabel}
                </Button>
            )}
            {note && (
                <Typography variant="caption" color="text.secondary">
                    {note}
                </Typography>
            )}
        </Card>
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
            <Card component="section" sx={{ gap: 1.25 }}>
                <Typography variant="h4" component="h2">
                    Gate &amp; pool access
                </Typography>
                <Typography variant="lead" color="text.secondary">
                    Your landlord hasn&apos;t shared access codes in the portal
                    yet. Ask {landlordFirst} for the current codes.
                </Typography>
                {askedAccess ? (
                    <Alert severity="info" role="status">
                        We&apos;ll let {landlordFirst} know you asked for access
                        codes.
                    </Alert>
                ) : (
                    <Button
                        variant="text"
                        onClick={() => setAskedAccess(true)}
                        sx={linkButtonSx}
                    >
                        Ask for access
                    </Button>
                )}
            </Card>
        </>
    )
}
