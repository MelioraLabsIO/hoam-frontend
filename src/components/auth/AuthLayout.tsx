import Link from "next/link"
import type { ReactNode } from "react"
import { BrandMark } from "@/components/ui"
import "./auth.css"

export const COMMUNITY = "Willow Creek"

/** Centered card layout shared by the password and two-factor screens. */
export function AuthLayout({
    children,
    footer,
    size,
    brandLink = true,
}: {
    children: ReactNode
    footer?: ReactNode
    size?: "md" | "lg"
    brandLink?: boolean
}) {
    const brand = (
        <>
            <BrandMark />
            <span className="auth-brand-name">{COMMUNITY}</span>
        </>
    )
    return (
        <div className="auth-page">
            {brandLink ? (
                <Link href="/auth/login" className="auth-brand auth-print-hide">
                    {brand}
                </Link>
            ) : (
                <div className="auth-brand auth-print-hide">{brand}</div>
            )}
            <main
                className={size ? `auth-card auth-card-${size}` : "auth-card"}
            >
                {children}
            </main>
            {footer && <p className="auth-foot auth-print-hide">{footer}</p>}
        </div>
    )
}

export function AuthHeader({
    title,
    children,
}: {
    title: ReactNode
    children?: ReactNode
}) {
    return (
        <div className="auth-head">
            <h1 className="auth-title">{title}</h1>
            {children && <p className="auth-lead">{children}</p>}
        </div>
    )
}

export function AuthAlert({ children }: { children: ReactNode }) {
    return (
        <div role="alert" className="auth-alert">
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16.5v.01" />
            </svg>
            <span>{children}</span>
        </div>
    )
}

export function AuthIcon({ kind }: { kind: "mail" | "check" | "shield" }) {
    return (
        <div className="auth-icon" aria-hidden="true">
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={kind === "check" ? 2.2 : 1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {kind === "mail" && (
                    <>
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                    </>
                )}
                {kind === "check" && <path d="m5 12 4.5 4.5L19 7" />}
                {kind === "shield" && (
                    <>
                        <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
                        <path d="m9 12 2 2 4-4" />
                    </>
                )}
            </svg>
        </div>
    )
}

/** Shown on every auth screen while no Supabase project is connected. */
export function DemoNotice({ children }: { children: ReactNode }) {
    return (
        <div className="auth-note" role="note">
            <strong style={{ color: "var(--ink)" }}>Demo mode.</strong>{" "}
            {children}
        </div>
    )
}
