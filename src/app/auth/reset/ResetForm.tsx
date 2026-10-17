"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { AuthAlert, AuthHeader, AuthIcon } from "@/components/auth/AuthLayout"
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
                <Link href="/auth/login" className="auth-btn">
                    Go to sign in
                </Link>
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
        <form action={action} className="auth-form" style={{ gap: 18 }}>
            <AuthHeader title="Choose a new password">
                {email ? `For ${email}` : "For your Willow Creek account"}
            </AuthHeader>
            {state?.error && <AuthAlert>{state.error}</AuthAlert>}
            <div className="field">
                <label htmlFor="rp-new" className="label">
                    New password
                </label>
                <input
                    id="rp-new"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    aria-describedby="rp-rules"
                    className="auth-input"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                />
            </div>
            <div className="field">
                <label htmlFor="rp-confirm" className="label">
                    Confirm new password
                </label>
                <input
                    id="rp-confirm"
                    name="confirm"
                    type="password"
                    autoComplete="new-password"
                    className="auth-input"
                    value={pw2}
                    onChange={(e) => setPw2(e.target.value)}
                />
            </div>
            <ul id="rp-rules" className="auth-rules">
                {rules.map((r) => (
                    <li key={r.label} data-ok={r.ok}>
                        {r.ok ? (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="m5 12 4.5 4.5L19 7" />
                            </svg>
                        ) : (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--faint)"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="12" r="7" />
                            </svg>
                        )}
                        <span>{r.label}</span>
                        <span className="visually-hidden">
                            {r.ok ? "(done)" : "(not yet)"}
                        </span>
                    </li>
                ))}
            </ul>
            <button
                type="submit"
                className="auth-btn"
                disabled={!allOk || pending}
            >
                {pending ? "Updating…" : "Update password"}
            </button>
        </form>
    )
}
