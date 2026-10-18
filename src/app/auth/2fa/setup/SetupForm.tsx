"use client"

import Link from "next/link"
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

    return (
        <form
            className="auth-form"
            style={{ gap: 22 }}
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
                <div className="auth-info">
                    Required for HOA Manager accounts, because they can see
                    every home&apos;s billing and personal details.
                </div>
            )}

            <fieldset
                style={{
                    margin: 0,
                    padding: 0,
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    minWidth: 0,
                }}
            >
                <legend className="auth-step" style={{ paddingBottom: 10 }}>
                    1 · Choose how you&apos;ll get codes
                </legend>
                <div className="auth-methods">
                    {METHODS.map((m) => (
                        <button
                            key={m.id}
                            type="button"
                            className="auth-method"
                            aria-pressed={method === m.id}
                            onClick={() => {
                                setMethod(m.id)
                                setError(undefined)
                            }}
                        >
                            <span className="auth-method-name">
                                {m.name}
                                {m.recommended && (
                                    <span className="auth-badge">
                                        Recommended
                                    </span>
                                )}
                            </span>
                            <span className="auth-method-note">{m.note}</span>
                        </button>
                    ))}
                </div>
            </fieldset>

            <div className="stack" style={{ gap: 12 }}>
                <span className="auth-step">2 · Connect it</span>
                {method === "app" ? (
                    <div
                        className="row-wrap"
                        style={{ gap: 20, alignItems: "center" }}
                    >
                        <div
                            className="auth-qr"
                            role="img"
                            aria-label="QR code to scan with your authenticator app"
                        >
                            {app?.qrCode ? (
                                // Supabase returns the QR code as an SVG data URL.
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={app.qrCode} alt="" />
                            ) : app ? (
                                "QR code appears here once Supabase is connected"
                            ) : (
                                "Loading…"
                            )}
                        </div>
                        <div
                            className="stack"
                            style={{ flex: "1 1 260px", gap: 8 }}
                        >
                            <span style={{ fontSize: 15, lineHeight: 1.5 }}>
                                Scan this with Google Authenticator, 1Password,
                                Authy or any authenticator app.
                            </span>
                            <span className="text-md muted">
                                Can&apos;t scan? Enter this key instead:
                            </span>
                            <code className="auth-key">
                                {app?.secret ?? "…"}
                            </code>
                        </div>
                    </div>
                ) : (
                    <div
                        className="row-wrap"
                        style={{ gap: 10, alignItems: "flex-end" }}
                    >
                        <div className="field" style={{ flex: "1 1 260px" }}>
                            <label htmlFor="su-phone" className="label">
                                Mobile number
                            </label>
                            <input
                                id="su-phone"
                                type="tel"
                                autoComplete="tel"
                                placeholder="(555) 555-0123"
                                className="auth-input"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="auth-btn auth-btn-outline"
                            style={{ padding: "0 18px" }}
                            onClick={textMe}
                            disabled={pending}
                        >
                            {sms?.challengeId
                                ? "Text me a new code"
                                : "Text me a code"}
                        </button>
                    </div>
                )}
            </div>

            <div className="field">
                <label htmlFor="su-code" className="auth-step">
                    3 · Enter the 6-digit code
                </label>
                <input
                    id="su-code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="000000"
                    className="auth-input auth-code auth-code-sm"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>

            {error && <AuthAlert>{error}</AuthAlert>}

            <div
                className="auth-divider row-wrap"
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    paddingTop: 18,
                }}
            >
                {required ? (
                    <span />
                ) : (
                    <Link href={next} className="auth-link">
                        Remind me later
                    </Link>
                )}
                <button type="submit" className="auth-btn" disabled={pending}>
                    {pending ? "Checking…" : "Verify and turn on"}
                </button>
            </div>
        </form>
    )
}
