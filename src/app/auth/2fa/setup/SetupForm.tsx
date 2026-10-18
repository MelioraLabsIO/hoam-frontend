"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { AuthAlert, AuthHeader } from "@/components/auth/AuthLayout"
import {
    confirmEnrollment,
    enrollAuthenticator,
    enrollPhone,
    type Enrollment,
} from "@/lib/auth/actions"

type Method = "app" | "sms"

const METHODS: {
    id: Method
    name: string
    note: string
    recommended?: boolean
}[] = [
    {
        id: "app",
        name: "Authenticator app",
        note: "Codes from an app on your phone. Works without signal.",
        recommended: true,
    },
    {
        id: "sms",
        name: "Text message",
        note: "We text a code to your phone each time.",
    },
]

export default function SetupForm({
    next,
    required,
}: {
    next: string
    required: boolean
}) {
    const router = useRouter()
    const [method, setMethod] = useState<Method>("app")
    const [app, setApp] = useState<Enrollment>()
    const [sms, setSms] = useState<Enrollment>()
    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")
    const [error, setError] = useState<string>()
    const [pending, startTransition] = useTransition()

    // Start authenticator enrollment as soon as the screen opens, so the QR code is ready.
    useEffect(() => {
        if (method !== "app" || app) return
        let cancelled = false
        enrollAuthenticator().then((res) => {
            if (!cancelled) setApp(res)
        })
        return () => {
            cancelled = true
        }
    }, [method, app])

    const enrollment = method === "app" ? app : sms

    function textMe() {
        setError(undefined)
        startTransition(async () => {
            const res = await enrollPhone(phone)
            setSms(res)
            if (res.error) setError(res.error)
        })
    }

    function verify() {
        setError(undefined)
        if (!enrollment?.factorId) {
            setError(
                method === "sms"
                    ? "Text yourself a code first."
                    : "Setup is still loading. Try again in a moment."
            )
            return
        }
        startTransition(async () => {
            const res = await confirmEnrollment(
                enrollment.factorId,
                code.replace(/\s/g, ""),
                enrollment.challengeId
            )
            if (res?.error) setError(res.error)
            else
                router.push(`/auth/2fa/backup?next=${encodeURIComponent(next)}`)
        })
    }

    const stepSx = { fontWeight: "fontWeightBold" } as const

    return (
        <Stack
            component="form"
            sx={{ gap: 2.75 }}
            onSubmit={(e) => {
                e.preventDefault()
                verify()
            }}
        >
            <AuthHeader title="Turn on two-factor authentication">
                Each time you sign in on a new device, you&apos;ll enter a code
                as well as your password.
            </AuthHeader>
            {required && (
                <Alert
                    severity="info"
                    sx={{ py: 1.5, px: 1.75, fontWeight: "fontWeightSemiBold" }}
                >
                    Required for HOA Manager accounts, because they can see
                    every home&apos;s billing and personal details.
                </Alert>
            )}

            <FormControl component="fieldset" sx={{ gap: 1.25, minWidth: 0 }}>
                <FormLabel component="legend" sx={{ ...stepSx, pb: 1.25 }}>
                    1 · Choose how you&apos;ll get codes
                </FormLabel>
                <Box
                    sx={(theme) => ({
                        display: "grid",
                        gridTemplateColumns: `repeat(auto-fit, minmax(min(${theme.layout.grid.methods}px, 100%), 1fr))`,
                        gap: 1.25,
                    })}
                >
                    {METHODS.map((m) => {
                        const selected = method === m.id
                        return (
                            <Button
                                key={m.id}
                                aria-pressed={selected}
                                onClick={() => {
                                    setMethod(m.id)
                                    setError(undefined)
                                }}
                                sx={(theme) => ({
                                    minHeight: theme.spacing(10.5),
                                    py: 1.75,
                                    px: 2,
                                    borderRadius: `${theme.radius.lg}px`,
                                    borderColor: "border.main",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    gap: 0.5,
                                    textAlign: "left",
                                    whiteSpace: "normal",
                                    ...(selected && {
                                        border: 2,
                                        borderColor: "primary.main",
                                        bgcolor: "background.sunken",
                                        "&:hover": {
                                            borderColor: "primary.main",
                                            bgcolor: "background.sunken",
                                        },
                                    }),
                                })}
                            >
                                <Typography
                                    variant="subtitle1"
                                    component="span"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        fontWeight: "fontWeightSemiBold",
                                    }}
                                >
                                    {m.name}
                                    {m.recommended && (
                                        <Chip
                                            color="primary"
                                            label="Recommended"
                                            sx={{
                                                typography: "tiny",
                                                px: 0.875,
                                                py: 0.25,
                                            }}
                                        />
                                    )}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    component="span"
                                    color="text.secondary"
                                >
                                    {m.note}
                                </Typography>
                            </Button>
                        )
                    })}
                </Box>
            </FormControl>

            <Stack sx={{ gap: 1.5 }}>
                <Typography variant="label" sx={stepSx}>
                    2 · Connect it
                </Typography>
                {method === "app" ? (
                    <Stack
                        direction="row"
                        sx={{ flexWrap: "wrap", gap: 2.5, alignItems: "center" }}
                    >
                        <Typography
                            variant="caption"
                            component="div"
                            color="text.secondary"
                            role="img"
                            aria-label="QR code to scan with your authenticator app"
                            sx={(theme) => ({
                                width: theme.layout.qr,
                                height: theme.layout.qr,
                                flex: "0 0 auto",
                                borderRadius: `${theme.radius.lg}px`,
                                border: 1,
                                borderStyle: "dashed",
                                borderColor: "border.dashed",
                                bgcolor: "background.default",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                p: 1.5,
                                overflow: "hidden",
                            })}
                        >
                            {app?.qrCode ? (
                                // Supabase returns the QR code as an SVG data URL.
                                <Box
                                    component="img"
                                    src={app.qrCode}
                                    alt=""
                                    sx={{ width: 1, height: 1 }}
                                />
                            ) : app ? (
                                "QR code appears here once Supabase is connected"
                            ) : (
                                "Loading…"
                            )}
                        </Typography>
                        <Stack
                            sx={(theme) => ({
                                flex: 1,
                                minWidth: theme.spacing(32.5),
                                gap: 1,
                            })}
                        >
                            <Typography
                                variant="body1"
                                sx={{ lineHeight: 1.5 }}
                            >
                                Scan this with Google Authenticator, 1Password,
                                Authy or any authenticator app.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Can&apos;t scan? Enter this key instead:
                            </Typography>
                            <Typography
                                variant="mono"
                                component="code"
                                sx={(theme) => ({
                                    alignSelf: "flex-start",
                                    maxWidth: 1,
                                    px: 1.5,
                                    py: 1,
                                    borderRadius: `${theme.radius.xs}px`,
                                    bgcolor: "neutral.soft",
                                    overflowWrap: "anywhere",
                                })}
                            >
                                {app?.secret ?? "…"}
                            </Typography>
                        </Stack>
                    </Stack>
                ) : (
                    <Stack
                        direction="row"
                        sx={{
                            flexWrap: "wrap",
                            gap: 1.25,
                            alignItems: "flex-end",
                        }}
                    >
                        <TextField
                            id="su-phone"
                            type="tel"
                            label="Mobile number"
                            autoComplete="tel"
                            placeholder="(555) 555-0123"
                            size="medium"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            sx={(theme) => ({
                                flex: 1,
                                minWidth: theme.spacing(32.5),
                            })}
                        />
                        <Button
                            size="large"
                            onClick={textMe}
                            disabled={pending}
                            sx={{ px: 2.25 }}
                        >
                            {sms?.challengeId
                                ? "Text me a new code"
                                : "Text me a code"}
                        </Button>
                    </Stack>
                )}
            </Stack>

            <TextField
                id="su-code"
                type="text"
                label="3 · Enter the 6-digit code"
                autoComplete="one-time-code"
                placeholder="000000"
                size="medium"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                sx={(theme) => ({
                    "& .MuiOutlinedInput-root": {
                        maxWidth: theme.spacing(32.5),
                        minHeight: theme.spacing(7),
                    },
                })}
                slotProps={{
                    inputLabel: { sx: stepSx },
                    htmlInput: {
                        inputMode: "numeric",
                        maxLength: 6,
                        sx: { typography: "code", px: 2 },
                    },
                }}
            />

            {error && <AuthAlert>{error}</AuthAlert>}

            <Stack
                direction="row"
                sx={{
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1.5,
                    pt: 2.25,
                    borderTop: 1,
                    borderColor: "border.main",
                }}
            >
                {required ? (
                    <Box component="span" />
                ) : (
                    <Link
                        href={next}
                        variant="body1"
                        sx={{ fontWeight: "fontWeightSemiBold" }}
                    >
                        Remind me later
                    </Link>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={pending}
                >
                    {pending ? "Checking…" : "Verify and turn on"}
                </Button>
            </Stack>
        </Stack>
    )
}
