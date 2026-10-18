"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { AuthAlert } from "@/components/auth/AuthLayout"
import { signIn } from "@/lib/auth/actions"
import "@/components/auth/auth.css"

export default function SignInForm({ next }: { next?: string }) {
    const [state, action, pending] = useActionState(signIn, undefined)
    const [shown, setShown] = useState(false)
    const error = state?.error

    return (
        <form action={action} className="auth-form">
            {error && <AuthAlert>{error}</AuthAlert>}
            {next && <input type="hidden" name="next" value={next} />}
            <div className="field">
                <label htmlFor="si-email" className="label">
                    Email
                </label>
                <input
                    id="si-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="auth-input"
                />
            </div>
            <div className="field">
                <div className="spread" style={{ alignItems: "baseline" }}>
                    <label htmlFor="si-pw" className="label">
                        Password
                    </label>
                    <Link
                        href="/auth/forgot"
                        className="link-strong"
                        style={{ textDecoration: "none" }}
                    >
                        Forgot password?
                    </Link>
                </div>
                <div className="auth-pw">
                    <input
                        id="si-pw"
                        name="password"
                        type={shown ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="auth-input"
                        aria-invalid={error ? true : undefined}
                    />
                    <button
                        type="button"
                        className="auth-pw-toggle"
                        aria-pressed={shown}
                        aria-label={shown ? "Hide password" : "Show password"}
                        onClick={() => setShown((s) => !s)}
                    >
                        {shown ? "Hide" : "Show"}
                    </button>
                </div>
            </div>
            <label className="auth-check">
                <input type="checkbox" name="remember" />
                Keep me signed in on this device
            </label>
            <button type="submit" className="auth-btn" disabled={pending}>
                {pending ? "Signing in…" : "Sign in"}
            </button>
        </form>
    )
}
