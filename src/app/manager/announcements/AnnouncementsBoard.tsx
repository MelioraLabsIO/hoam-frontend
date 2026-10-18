"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Link from "@mui/material/Link"
import MenuItem from "@mui/material/MenuItem"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import type { Theme } from "@mui/material/styles"
import { useState, type FormEvent, type ReactNode } from "react"
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

const AUDIENCES = [
    "All residents",
    "Owners only",
    "Renters only",
    "One street…",
]

/** Compact check/radio row (36px tall, 15px label). */
const optionSx = (theme: Theme) => ({
    minHeight: theme.layout.control.sm,
    "& .MuiFormControlLabel-label": theme.typography.body1,
})

/** Text-style action in a post footer. */
function ActionLink({
    onClick,
    children,
}: {
    onClick: () => void
    children: ReactNode
}) {
    return (
        <Link component="button" type="button" variant="caption" onClick={onClick}>
            {children}
        </Link>
    )
}

export default function AnnouncementsBoard() {
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
    const [notice, setNotice] = useState<string | null>(null)
    // Bumped after each submit to remount (reset) the uncontrolled form.
    const [formKey, setFormKey] = useState(0)

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
        setFormKey((k) => k + 1)
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "flex-start",
            }}
        >
            <Stack
                component="section"
                aria-label="Posted and scheduled announcements"
                sx={(theme) => ({
                    flex: `999 1 ${theme.layout.split.main}px`,
                    minWidth: 0,
                    gap: 1.5,
                })}
            >
                {sorted.map((p) => {
                    const pill = statusPill(p)
                    return (
                        <Card
                            component="article"
                            sx={{ p: 2.25, gap: 1 }}
                            key={p.id}
                        >
                            <Stack
                                direction="row"
                                sx={{
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Pill tone={pill.tone}>{pill.label}</Pill>
                                <Typography
                                    variant="caption"
                                    component="span"
                                    color="text.secondary"
                                >
                                    {[
                                        p.audience,
                                        p.status === "scheduled"
                                            ? null
                                            : p.date,
                                        p.channels,
                                    ]
                                        .filter(Boolean)
                                        .join(" · ")}
                                </Typography>
                            </Stack>
                            <Typography variant="h6" component="h2">
                                {p.title}
                            </Typography>
                            {p.body && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {p.body}
                                </Typography>
                            )}
                            <Stack
                                direction="row"
                                sx={{
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    gap: 2,
                                    pt: 0.5,
                                }}
                            >
                                {p.seen !== undefined && (
                                    <Typography
                                        variant="caption"
                                        component="span"
                                        color="text.secondary"
                                    >
                                        Seen by {p.seen} of {RESIDENTS}
                                    </Typography>
                                )}
                                <ActionLink
                                    onClick={() =>
                                        setNotice(
                                            `Editing “${p.title}” is coming soon.`
                                        )
                                    }
                                >
                                    Edit
                                </ActionLink>
                                {p.status === "pinned" && (
                                    <ActionLink
                                        onClick={() =>
                                            update(p.id, { status: "sent" })
                                        }
                                    >
                                        Unpin
                                    </ActionLink>
                                )}
                                {(p.status === "scheduled" ||
                                    p.status === "draft") && (
                                    <ActionLink
                                        onClick={() =>
                                            update(p.id, {
                                                status: "sent",
                                                date: TODAY,
                                                seen: 0,
                                            })
                                        }
                                    >
                                        Send now
                                    </ActionLink>
                                )}
                            </Stack>
                        </Card>
                    )
                })}
            </Stack>

            <Card
                component="section"
                aria-labelledby="compose-h"
                sx={(theme) => ({
                    p: 2.75,
                    gap: 2,
                    flex: `1 1 ${theme.spacing(45)}`,
                    minWidth: 0,
                })}
            >
                <Typography id="compose-h" variant="h4" component="h2">
                    New announcement
                </Typography>
                <Stack
                    component="form"
                    key={formKey}
                    sx={{ gap: 2 }}
                    onSubmit={onSubmit}
                >
                    <TextField
                        id="a-title"
                        name="title"
                        label="Title"
                        placeholder="e.g. Gate codes changing Nov 4"
                        slotProps={{ htmlInput: { required: true } }}
                    />
                    <TextField
                        id="a-body"
                        name="body"
                        label="Message"
                        multiline
                        rows={5}
                    />
                    <TextField
                        id="a-aud"
                        name="audience"
                        label="Audience"
                        select
                        defaultValue={AUDIENCES[0]}
                    >
                        {AUDIENCES.map((a) => (
                            <MenuItem key={a} value={a}>
                                {a}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" sx={{ pb: 0.75 }}>
                            Also send by
                        </FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                sx={optionSx}
                                control={<Checkbox name="push" defaultChecked />}
                                label="Push notification"
                            />
                            <FormControlLabel
                                sx={optionSx}
                                control={<Checkbox name="email" />}
                                label="Email"
                            />
                            <FormControlLabel
                                sx={optionSx}
                                control={<Checkbox name="pin" />}
                                label="Pin to top of the feed"
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" sx={{ pb: 0.75 }}>
                            When
                        </FormLabel>
                        <RadioGroup name="when" defaultValue="now">
                            <FormControlLabel
                                sx={optionSx}
                                value="now"
                                control={<Radio />}
                                label="Post now"
                            />
                            <FormControlLabel
                                sx={optionSx}
                                value="later"
                                control={<Radio />}
                                label="Schedule for later"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1.25 }}>
                        <Button
                            type="submit"
                            name="intent"
                            value="draft"
                            sx={(theme) => ({
                                flex: 1,
                                minWidth: theme.spacing(15),
                            })}
                        >
                            Save draft
                        </Button>
                        <Button
                            type="submit"
                            name="intent"
                            value="post"
                            variant="contained"
                            sx={(theme) => ({
                                flex: 1,
                                minWidth: theme.spacing(15),
                            })}
                        >
                            Post
                        </Button>
                    </Stack>
                    {notice && (
                        <Alert severity="info" role="status">
                            {notice}
                        </Alert>
                    )}
                </Stack>
            </Card>
        </Box>
    )
}
