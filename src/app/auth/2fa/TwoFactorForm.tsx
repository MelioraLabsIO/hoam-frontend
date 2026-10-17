"use client"

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
        <form action={action} className="auth-form" style={{ gap: 20 }}>
            <AuthIcon kind="shield" />
            <AuthHeader title={cur.title}>
                {method === "sms" && sending
                    ? `Sending a code to ${phone}…`
                    : cur.hint}
            </AuthHeader>
            {error && <AuthAlert>{error}</AuthAlert>}
            <input type="hidden" name="method" value={method} />
            <input type="hidden" name="next" value={next} />
            <div className="field">
                <label htmlFor="tf-code" className="label">
                    {cur.label}
                </label>
                <input
                    key={method}
                    id="tf-code"
                    name="code"
                    type="text"
                    inputMode={cur.numeric ? "numeric" : "text"}
                    autoComplete="one-time-code"
                    maxLength={cur.maxLength}
                    placeholder={cur.placeholder}
                    required
                    autoFocus
                    className={
                        method === "backup"
                            ? "auth-input auth-code auth-code-long"
                            : "auth-input auth-code"
                    }
                />
            </div>
            <label className="auth-check">
                <input type="checkbox" name="trust" />
                Don&apos;t ask again on this device for 30 days
            </label>
            <button type="submit" className="auth-btn" disabled={pending}>
                {pending ? "Verifying…" : "Verify and continue"}
            </button>

            {available.length > 1 && (
                <div className="auth-divider stack" style={{ gap: 4 }}>
                    <span
                        className="text-md strong muted"
                        style={{ paddingBottom: 4 }}
                    >
                        Other ways to verify
                    </span>
                    {available
                        .filter((m) => m !== method)
                        .map((m) => (
                            <button
                                key={m}
                                type="button"
                                className="auth-link-btn"
                                style={{ minHeight: 44, fontSize: 15 }}
                                onClick={() => pick(m)}
                            >
                                {copy[m].other}
                            </button>
                        ))}
                </div>
            )}
        </form>
    )
}
