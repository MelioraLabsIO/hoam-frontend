"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { visuallyHidden } from "@mui/utils"
import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
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
    const [where, setWhere] = useState(LOCATIONS[0])
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
        setWhere(LOCATIONS[0])
        form.reset()
    }

    return (
        <Stack
            direction="row"
            sx={{ flexWrap: "wrap", gap: 2, alignItems: "flex-start" }}
        >
            <Card
                component="section"
                aria-labelledby="new-h"
                sx={(theme) => ({
                    flex: `1 1 ${theme.spacing(47.5)}`,
                    p: 2.75,
                })}
            >
                <Typography id="new-h" variant="h4" component="h2">
                    Report an issue
                </Typography>
                <Stack component="form" sx={{ gap: 1.75 }} onSubmit={onSubmit}>
                    <TextField
                        select
                        id="t-where"
                        name="where"
                        label="Where is it?"
                        value={where}
                        onChange={(e) => setWhere(e.target.value)}
                    >
                        {LOCATIONS.map((l) => (
                            <MenuItem key={l} value={l}>
                                {l}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="t-desc"
                        name="desc"
                        label="What's going on?"
                        multiline
                        rows={4}
                        required
                    />
                    <Box
                        component="input"
                        ref={fileRef}
                        type="file"
                        name="photos"
                        accept="image/*"
                        multiple
                        tabIndex={-1}
                        aria-hidden="true"
                        sx={visuallyHidden}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPhotos(
                                Array.from(e.target.files ?? []).map(
                                    (f) => f.name
                                )
                            )
                        }
                    />
                    <Button
                        onClick={() => fileRef.current?.click()}
                        sx={(theme) => ({
                            minHeight: theme.spacing(8),
                            borderStyle: "dashed",
                            borderColor: "border.dashed",
                            bgcolor: "background.muted",
                            color: "text.secondary",
                            typography: "label",
                            "&:hover": {
                                borderStyle: "dashed",
                                bgcolor: "background.muted",
                            },
                        })}
                    >
                        {photos.length
                            ? `${photos.length} photo${photos.length > 1 ? "s" : ""} added`
                            : "Add photos"}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={(theme) => ({
                            minHeight: theme.layout.control.lg,
                            fontSize: theme.typography.subtitle1.fontSize,
                        })}
                    >
                        Send to management
                    </Button>
                    {sent && (
                        <Alert severity="info" role="status">
                            Request #{sent} sent. {LANDLORD} was copied.
                        </Alert>
                    )}
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ lineHeight: 1.45 }}
                    >
                        Problems inside the home go to your landlord, not the
                        HOA. Changes to the outside of the home need your
                        landlord to request approval.
                    </Typography>
                </Stack>
            </Card>

            <Stack
                component="section"
                sx={(theme) => ({
                    flex: `999 1 ${theme.spacing(60)}`,
                    minWidth: 0,
                    gap: 1.5,
                })}
            >
                <Typography variant="h4" component="h2">
                    Your requests
                </Typography>
                {requests.map((r) => (
                    <Card
                        key={r.id}
                        component="article"
                        sx={{ p: 2.25, gap: 1 }}
                    >
                        <Stack
                            direction="row"
                            sx={{
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 1,
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontWeight: "fontWeightSemiBold" }}
                            >
                                #{r.id} · {r.date}
                            </Typography>
                            <Pill tone={r.tone}>{r.status}</Pill>
                        </Stack>
                        <Typography variant="h6" component="p">
                            {r.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {r.note}
                        </Typography>
                    </Card>
                ))}
            </Stack>
        </Stack>
    )
}
