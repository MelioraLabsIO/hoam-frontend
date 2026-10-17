"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import { createClient } from "@/lib/supabase/client"

type Mode = "password" | "magic"

export default function LoginForm() {
    const router = useRouter()
    const [mode, setMode] = useState<Mode>("password")
    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [sentTo, setSentTo] = useState<string | null>(null)

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        const data = new FormData(e.currentTarget)
        const email = String(data.get("email"))
        setPending(true)
        try {
            const supabase = createClient()
            if (mode === "magic") {
                const { error } = await supabase.auth.signInWithOtp({
                    email,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                setSentTo(email)
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password: String(data.get("password")),
                })
                if (error) throw error
                router.push("/")
                router.refresh()
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Try again."
            )
        } finally {
            setPending(false)
        }
    }

    if (sentTo) {
        return (
            <div className="callout callout-info" role="status">
                Check <strong>{sentTo}</strong> for a sign-in link.
            </div>
        )
    }

    return (
        <form className="stack" style={{ gap: 16 }} onSubmit={onSubmit}>
            <div
                className="tabs"
                role="tablist"
                aria-label="Sign-in method"
                style={{ alignSelf: "flex-start" }}
            >
                <button
                    type="button"
                    role="tab"
                    className="tab"
                    aria-selected={mode === "password"}
                    onClick={() => setMode("password")}
                >
                    Password
                </button>
                <button
                    type="button"
                    role="tab"
                    className="tab"
                    aria-selected={mode === "magic"}
                    onClick={() => setMode("magic")}
                >
                    Email me a link
                </button>
            </div>
            <div className="field">
                <label htmlFor="email" className="label">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="input"
                    required
                />
            </div>
            {mode === "password" && (
                <div className="field">
                    <label htmlFor="password" className="label">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="input"
                        required
                    />
                </div>
            )}
            {error && (
                <p className="callout" role="alert">
                    {error}
                </p>
            )}
            <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={pending}
            >
                {pending
                    ? "Signing in…"
                    : mode === "magic"
                      ? "Send sign-in link"
                      : "Sign in"}
            </button>
        </form>
    )
}
