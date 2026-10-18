"use client"

import Link from "next/link"
import { useActionState } from "react"
import { AuthAlert, AuthHeader, AuthIcon } from "@/components/auth/AuthLayout"
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
                <form action={action} className="auth-note">
                    <input type="hidden" name="email" value={state.message} />
                    Don&apos;t see it? Check spam, or{" "}
                    <button
                        type="submit"
                        className="auth-link-btn"
                        disabled={pending}
                    >
                        {pending ? "sending…" : "resend the link"}
                    </button>
                    .
                </form>
                {demo && (
                    <Link
                        href="/auth/reset"
                        className="auth-btn auth-btn-outline"
                    >
                        Open the link (demo mode)
                    </Link>
                )}
                <Link
                    href="/auth/login"
                    className="auth-link"
                    style={{ alignSelf: "center" }}
                >
                    Back to sign in
                </Link>
            </>
        )
    }

    return (
        <form action={action} className="auth-form" style={{ gap: 20 }}>
            <AuthHeader
                title={invite ? "Set up your account" : "Reset your password"}
            >
                {invite
                    ? "Enter the email your HOA or landlord invited. We'll send you a link to choose your password."
                    : "Enter the email you sign in with. We'll send you a link to choose a new password."}
            </AuthHeader>
            {state?.error && <AuthAlert>{state.error}</AuthAlert>}
            <div className="field">
                <label htmlFor="fp-email" className="label">
                    Email
                </label>
                <input
                    id="fp-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="auth-input"
                />
            </div>
            <button type="submit" className="auth-btn" disabled={pending}>
                {pending
                    ? "Sending…"
                    : invite
                      ? "Send setup link"
                      : "Send reset link"}
            </button>
            <Link
                href="/auth/login"
                className="auth-link"
                style={{ alignSelf: "center" }}
            >
                Back to sign in
            </Link>
        </form>
    )
}
