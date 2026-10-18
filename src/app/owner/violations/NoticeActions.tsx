"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
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

/** Grey dashed box standing in for the inspection photo. */
export function PhotoPlaceholder({ sent }: { sent: string }) {
    return (
        <Typography
            role="img"
            aria-label={`Inspection photo from ${sent}`}
            variant="body2"
            color="text.secondary"
            sx={(theme) => ({
                height: theme.spacing(22.5),
                borderRadius: `${theme.radius.md}px`,
                bgcolor: "neutral.soft",
                border: 1,
                borderStyle: "dashed",
                borderColor: "border.dashed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            })}
        >
            [Inspection photo from {sent}]
        </Typography>
    )
}

/** Amber band with the deadline. */
export function DeadlineBand({
    deadline,
    note,
}: {
    deadline: string
    note: string
}) {
    return (
        <Box
            sx={(theme) => ({
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                p: 1.75,
                borderRadius: `${theme.radius.md}px`,
                bgcolor: "amber.wash",
            })}
        >
            <Typography
                component="span"
                color="amber.dark"
                sx={{ fontWeight: "fontWeightSemiBold" }}
            >
                {deadline}
            </Typography>
            <Typography variant="body2" component="span" color="amber.alertText">
                {note}
            </Typography>
        </Box>
    )
}

// Notice actions aren't wired to Supabase yet; they confirm locally.
export default function NoticeActions() {
    const [message, setMessage] = useState<string | null>(null)
    return (
        <>
            <Stack
                direction="row"
                sx={{ flexWrap: "wrap", alignItems: "center", gap: 1.25 }}
            >
                {ACTIONS.map((a) => (
                    <Button
                        key={a.id}
                        variant={a.primary ? "contained" : "outlined"}
                        onClick={() => setMessage(a.done)}
                        sx={(theme) => ({
                            flex: `1 1 ${theme.spacing(20)}`,
                            minHeight: theme.layout.control.lg,
                        })}
                    >
                        {a.label}
                    </Button>
                ))}
            </Stack>
            {message && (
                <Alert severity="info" role="status">
                    {message}
                </Alert>
            )}
        </>
    )
}
