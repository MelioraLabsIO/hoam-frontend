"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
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
        <Card component="section">
            <Typography variant="h4" component="h2">
                Quick announcement
            </Typography>
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}
            >
                <TextField
                    id="ann-title"
                    name="title"
                    label="Title"
                    placeholder="e.g. Gate codes changing Nov 4"
                    slotProps={{ htmlInput: { required: true } }}
                />
                <TextField
                    id="ann-body"
                    name="body"
                    label="Message"
                    multiline
                    rows={3}
                />
                <Stack
                    direction="row"
                    sx={{
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1.25,
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox name="push" defaultChecked />}
                        label="Send push notification to all residents"
                    />
                    <Button type="submit" variant="contained">
                        Post
                    </Button>
                </Stack>
                {posted && (
                    <Alert severity="info" role="status">
                        “{posted}” is ready to post once announcements are
                        connected.
                    </Alert>
                )}
            </Box>
        </Card>
    )
}
