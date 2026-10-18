"use client"

import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useActionState, useState } from "react"
import { AuthAlert, AuthHeader, AuthIcon } from "@/components/auth/AuthLayout"
import { CheckIcon, StrokeIcon } from "@/components/icons"
import { VisuallyHidden } from "@/components/ui"
import { updatePassword } from "@/lib/auth/actions"

export default function ResetForm({ email }: { email?: string }) {
    const [state, action, pending] = useActionState(updatePassword, undefined)
    const [pw, setPw] = useState("")
    const [pw2, setPw2] = useState("")

    if (state?.ok) {
        return (
            <>
                <AuthIcon kind="check" />
                <AuthHeader title="Password updated">
                    We signed you out everywhere, including here. Sign in with
                    your new password.
                </AuthHeader>
                <Button href="/auth/login" variant="contained" size="large">
                    Go to sign in
                </Button>
            </>
        )
    }

    const rules = [
        { label: "At least 10 characters", ok: pw.length >= 10 },
        {
            label: "A letter and a number",
            ok: /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw),
        },
        { label: "Both passwords match", ok: pw.length > 0 && pw === pw2 },
    ]
    const allOk = rules.every((r) => r.ok)

    return (
        <Stack component="form" action={action} sx={{ gap: 2.25 }}>
            <AuthHeader title="Choose a new password">
                {email ? `For ${email}` : "For your Willow Creek account"}
            </AuthHeader>
            {state?.error && <AuthAlert>{state.error}</AuthAlert>}
            <TextField
                id="rp-new"
                name="password"
                type="password"
                label="New password"
                autoComplete="new-password"
                size="medium"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                slotProps={{ htmlInput: { "aria-describedby": "rp-rules" } }}
            />
            <TextField
                id="rp-confirm"
                name="confirm"
                type="password"
                label="Confirm new password"
                autoComplete="new-password"
                size="medium"
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
            />
            <List
                id="rp-rules"
                disablePadding
                sx={(theme) => ({
                    p: 1.75,
                    borderRadius: `${theme.radius.md}px`,
                    bgcolor: "background.default",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                })}
            >
                {rules.map((r) => (
                    <ListItem
                        key={r.label}
                        disablePadding
                        sx={{
                            gap: 1.25,
                            color: r.ok
                                ? "primary.softContrast"
                                : "text.secondary",
                        }}
                    >
                        {r.ok ? (
                            <CheckIcon fontSize="small" strokeWidth={2.4} />
                        ) : (
                            <StrokeIcon
                                fontSize="small"
                                sx={{ color: "text.faint" }}
                            >
                                <circle cx="12" cy="12" r="7" />
                            </StrokeIcon>
                        )}
                        <Typography
                            variant="body2"
                            component="span"
                            sx={{
                                fontWeight: r.ok
                                    ? "fontWeightSemiBold"
                                    : "fontWeightMedium",
                            }}
                        >
                            {r.label}
                        </Typography>
                        <VisuallyHidden>
                            {r.ok ? "(done)" : "(not yet)"}
                        </VisuallyHidden>
                    </ListItem>
                ))}
            </List>
            <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!allOk || pending}
            >
                {pending ? "Updating…" : "Update password"}
            </Button>
        </Stack>
    )
}
