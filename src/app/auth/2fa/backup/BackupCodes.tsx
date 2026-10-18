"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { Theme } from "@mui/material/styles"
import { useState } from "react"
import { AuthHeader, AuthNote, COMMUNITY } from "@/components/auth/AuthLayout"
import { CheckIcon } from "@/components/icons"

export default function BackupCodes({
    codes,
    next,
    demo,
}: {
    codes: string[]
    next: string
    demo: boolean
}) {
    const [saved, setSaved] = useState(false)
    const [copied, setCopied] = useState(false)
    const text = `${COMMUNITY} backup codes\nEach code works once.\n\n${codes.join("\n")}\n`

    function download() {
        const url = URL.createObjectURL(
            new Blob([text], { type: "text/plain" })
        )
        const a = document.createElement("a")
        a.href = url
        a.download = "willow-creek-backup-codes.txt"
        a.click()
        URL.revokeObjectURL(url)
    }

    async function copy() {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
        } catch {
            setCopied(false)
        }
    }

    const flexButton = (t: Theme) => ({ flex: 1, minWidth: t.spacing(15) })

    return (
        <>
            <Typography
                variant="label"
                color="primary.softContrast"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    fontWeight: "fontWeightBold",
                    displayPrint: "none",
                }}
            >
                <CheckIcon strokeWidth={2.2} />
                Two-factor authentication is on
            </Typography>
            <AuthHeader title="Save your backup codes">
                If you lose your phone, each of these codes lets you sign in
                once. Keep them somewhere safe, like a password manager. We
                won&apos;t show them again.
            </AuthHeader>

            <List
                aria-label="Backup codes"
                disablePadding
                sx={(theme) => ({
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fit, minmax(min(${theme.layout.grid.codes}px, 100%), 1fr))`,
                    gap: 1,
                    p: 2,
                    borderRadius: `${theme.radius.lg}px`,
                    bgcolor: "background.default",
                    border: 1,
                    borderColor: "border.main",
                })}
            >
                {codes.map((c) => (
                    <ListItem
                        key={c}
                        disablePadding
                        sx={(theme) => ({
                            ...theme.typography.mono,
                            justifyContent: "center",
                            textAlign: "center",
                            px: 1.25,
                            py: 1,
                            borderRadius: `${theme.radius.xs}px`,
                            bgcolor: "background.paper",
                        })}
                    >
                        {c}
                    </ListItem>
                ))}
            </List>
            {demo && (
                <Box sx={{ displayPrint: "none" }}>
                    <AuthNote>
                        <strong>Demo mode:</strong> these codes are examples
                        and aren&apos;t saved anywhere.
                    </AuthNote>
                </Box>
            )}

            <Stack
                direction="row"
                sx={{ flexWrap: "wrap", gap: 1.25, displayPrint: "none" }}
            >
                <Button onClick={download} sx={flexButton}>
                    Download
                </Button>
                <Button onClick={copy} sx={flexButton}>
                    {copied ? "Copied" : "Copy"}
                </Button>
                <Button onClick={() => window.print()} sx={flexButton}>
                    Print
                </Button>
            </Stack>

            <FormControlLabel
                control={
                    <Checkbox
                        size="medium"
                        checked={saved}
                        onChange={(e) => setSaved(e.target.checked)}
                    />
                }
                label="I've saved my backup codes"
                sx={{
                    displayPrint: "none",
                    "& .MuiFormControlLabel-label": {
                        typography: "body1",
                        fontWeight: "fontWeightSemiBold",
                    },
                }}
            />

            <Button
                variant="contained"
                size="large"
                href={saved ? next : undefined}
                disabled={!saved}
                sx={{ displayPrint: "none" }}
            >
                Continue to {COMMUNITY}
            </Button>
        </>
    )
}
