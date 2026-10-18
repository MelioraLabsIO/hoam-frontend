"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { useActionState } from "react"
import {
    AuthAlert,
    AuthHeader,
    AuthIcon,
    AuthNote,
} from "@/components/auth/AuthLayout"
import { requestPasswordReset } from "@/lib/auth/actions"

/** d.ortega@example.com → d•••@example.com */
function maskEmail(email: string) {
    const [name, domain] = email.split("@")
    return domain ? `${name[0]}•••@${domain}` : email
}

export default function ForgotForm({
    invite,
    demo,
}: {
    invite: boolean
    demo: boolean
}) {
    const [state, action, pending] = useActionState(
        requestPasswordReset,
        undefined
    )

    const back = (
        <Link
            href="/auth/login"
            variant="body1"
            sx={{ alignSelf: "center", fontWeight: "fontWeightSemiBold" }}
        >
            Back to sign in
        </Link>
    )

    if (state?.ok && state.message) {
        return (
            <>
                <AuthIcon kind="mail" />
                <AuthHeader title="Check your email">
                    If an account exists for{" "}
                    <strong>{maskEmail(state.message)}</strong>, a link to
                    choose {invite ? "your" : "a new"} password is on its way.
                    It works once and expires in 30 minutes.
                </AuthHeader>
                <AuthNote>
                    <Box component="form" action={action}>
                        <input
                            type="hidden"
                            name="email"
                            value={state.message}
                        />
                        Don&apos;t see it? Check spam, or{" "}
                        <Button
                            type="submit"
                            variant="text"
                            disabled={pending}
                            sx={{
                                p: 0,
                                minHeight: 0,
                                font: "inherit",
                                fontWeight: "fontWeightSemiBold",
                                verticalAlign: "baseline",
                            }}
                        >
                            {pending ? "sending…" : "resend the link"}
                        </Button>
                        .
                    </Box>
                </AuthNote>
                {demo && (
                    <Button href="/auth/reset" size="large">
                        Open the link (demo mode)
                    </Button>
                )}
                {back}
            </>
        )
    }

    return (
        <Stack component="form" action={action} sx={{ gap: 2.5 }}>
            <AuthHeader
                title={invite ? "Set up your account" : "Reset your password"}
            >
                {invite
                    ? "Enter the email your HOA or landlord invited. We'll send you a link to choose your password."
                    : "Enter the email you sign in with. We'll send you a link to choose a new password."}
            </AuthHeader>
            {state?.error && <AuthAlert>{state.error}</AuthAlert>}
            <TextField
                id="fp-email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                size="medium"
                slotProps={{ htmlInput: { required: true } }}
            />
            <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={pending}
            >
                {pending
                    ? "Sending…"
                    : invite
                      ? "Send setup link"
                      : "Send reset link"}
            </Button>
            {back}
        </Stack>
    )
}
