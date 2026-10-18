"use client"

import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useActionState, useState, useTransition } from "react"
import {
    AuthAlert,
    AuthHeader,
    AuthIcon,
    COMMUNITY,
} from "@/components/auth/AuthLayout"
import { sendSmsCode, verifyTwoFactor } from "@/lib/auth/actions"
import type { MfaMethods } from "@/lib/auth/session"

type Method = "app" | "sms" | "backup"

export default function TwoFactorForm({
    next,
    methods,
}: {
    next: string
    methods: MfaMethods
}) {
    const phone = methods.phoneHint ?? "your phone"
    const copy: Record<
        Method,
        {
            title: string
            hint: string
            label: string
            placeholder: string
            maxLength: number
            numeric: boolean
            other: string
        }
    > = {
        app: {
            title: "Enter your 6-digit code",
            hint: `Open your authenticator app and enter the code shown for ${COMMUNITY}.`,
            label: "Authentication code",
            placeholder: "000000",
            maxLength: 6,
            numeric: true,
            other: "Use your authenticator app",
        },
        sms: {
            title: "Check your phone",
            hint: `We texted a 6-digit code to ${phone}. It expires in 10 minutes.`,
            label: "Text message code",
            placeholder: "000000",
            maxLength: 6,
            numeric: true,
            other: `Text a code to ${phone}`,
        },
        backup: {
            title: "Use a backup code",
            hint: "Enter one of the 10 backup codes you saved when you set up two-factor. Each code works once.",
            label: "Backup code",
            placeholder: "xxxx-xxxx-xxxx-xxxx",
            maxLength: 19,
            numeric: false,
            other: "Use a backup code",
        },
    }

    const available: Method[] = [
        ...(methods.app ? ["app" as const] : []),
        ...(methods.sms ? ["sms" as const] : []),
        ...(methods.backup ? ["backup" as const] : []),
    ]
    const [method, setMethod] = useState<Method>(available[0] ?? "app")
    const [state, action, pending] = useActionState(verifyTwoFactor, undefined)
    const [smsError, setSmsError] = useState<string>()
    const [sending, startSending] = useTransition()
    const cur = copy[method]

    function pick(m: Method) {
        setMethod(m)
        setSmsError(undefined)
        if (m === "sms") {
            startSending(async () => {
                const res = await sendSmsCode()
                if (res?.error) setSmsError(res.error)
            })
        }
    }

    const error = smsError ?? state?.error

    return (
        <Stack component="form" action={action} sx={{ gap: 2.5 }}>
            <AuthIcon kind="shield" />
            <AuthHeader title={cur.title}>
                {method === "sms" && sending
                    ? `Sending a code to ${phone}…`
                    : cur.hint}
            </AuthHeader>
            {error && <AuthAlert>{error}</AuthAlert>}
            <input type="hidden" name="method" value={method} />
            <input type="hidden" name="next" value={next} />
            <TextField
                key={method}
                id="tf-code"
                name="code"
                type="text"
                label={cur.label}
                autoComplete="one-time-code"
                placeholder={cur.placeholder}
                autoFocus
                size="medium"
                sx={(theme) => ({
                    "& .MuiOutlinedInput-root": {
                        minHeight: theme.layout.control.code,
                    },
                })}
                slotProps={{
                    htmlInput: {
                        required: true,
                        inputMode: cur.numeric ? "numeric" : "text",
                        maxLength: cur.maxLength,
                        sx: {
                            typography:
                                method === "backup" ? "codeLg" : "code",
                            px: 2,
                        },
                    },
                }}
            />
            <FormControlLabel
                control={<Checkbox name="trust" />}
                label="Don't ask again on this device for 30 days"
                sx={{ "& .MuiFormControlLabel-label": { typography: "body1" } }}
            />
            <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={pending}
            >
                {pending ? "Verifying…" : "Verify and continue"}
            </Button>

            {available.length > 1 && (
                <Stack
                    sx={{
                        gap: 0.5,
                        pt: 2,
                        borderTop: 1,
                        borderColor: "border.main",
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: "fontWeightSemiBold", pb: 0.5 }}
                    >
                        Other ways to verify
                    </Typography>
                    {available
                        .filter((m) => m !== method)
                        .map((m) => (
                            <Button
                                key={m}
                                variant="text"
                                onClick={() => pick(m)}
                                sx={(theme) => ({
                                    minHeight: theme.layout.tapTarget,
                                    px: 0,
                                    justifyContent: "flex-start",
                                    textAlign: "left",
                                    whiteSpace: "normal",
                                    typography: "body1",
                                    fontWeight: "fontWeightSemiBold",
                                })}
                            >
                                {copy[m].other}
                            </Button>
                        ))}
                </Stack>
            )}
        </Stack>
    )
}
