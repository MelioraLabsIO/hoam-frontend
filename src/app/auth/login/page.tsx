import type { Metadata } from "next"
import Link from "next/link"
import { AuthHeader, COMMUNITY } from "@/components/auth/AuthLayout"
import { BrandMark } from "@/components/ui"
import { isDemoMode } from "@/lib/auth/config"
import SignInForm from "./SignInForm"

export const metadata: Metadata = { title: "Sign in" }

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ next?: string }>
}) {
    const { next } = await searchParams
    return (
        <div className="auth-split">
            <aside className="auth-aside">
                <div className="row" style={{ gap: 10 }}>
                    <BrandMark size={40} />
                    <span className="display" style={{ fontSize: 20 }}>
                        {COMMUNITY}
                    </span>
                </div>
                <div className="stack" style={{ gap: 16, maxWidth: 460 }}>
                    <h2 className="auth-aside-title">
                        Your community, all in one place.
                    </h2>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 17,
                            lineHeight: 1.5,
                            color: "var(--nav-text)",
                        }}
                    >
                        Pay dues, book the clubhouse, follow your requests and
                        stay in the loop.
                    </p>
                </div>
                <div className="stack" style={{ gap: 10 }}>
                    <div className="row-wrap" style={{ gap: 8 }}>
                        <span className="auth-aside-chip">HOA Manager</span>
                        <span className="auth-aside-chip">Owner</span>
                        <span className="auth-aside-chip">Tenant</span>
                    </div>
                    <span style={{ fontSize: 14, color: "var(--nav-sub)" }}>
                        One sign-in for everyone. You&apos;ll land in the portal
                        that matches your account.
                    </span>
                </div>
            </aside>

            <main className="auth-main">
                <div
                    className="stack"
                    style={{ width: "100%", maxWidth: 420, gap: 22 }}
                >
                    <AuthHeader
                        title={<span style={{ fontSize: 34 }}>Sign in</span>}
                    >
                        Welcome back to {COMMUNITY}.
                    </AuthHeader>
                    <SignInForm next={next} />
                    {isDemoMode && (
                        <div className="auth-note" role="note">
                            <strong style={{ color: "var(--ink)" }}>
                                Demo mode:
                            </strong>{" "}
                            no Supabase project is connected yet, so any email
                            and password signs in. Emails containing{" "}
                            <strong>manager</strong> open the HOA Manager
                            portal, <strong>tenant</strong> opens the Tenant
                            portal, and anything else opens the Owner portal.
                        </div>
                    )}
                    <div
                        className="auth-divider"
                        style={{
                            paddingTop: 18,
                            fontSize: 15,
                            lineHeight: 1.5,
                            color: "var(--muted)",
                        }}
                    >
                        Got an invite from your HOA or your landlord?{" "}
                        <Link
                            href="/auth/forgot?invite=1"
                            className="auth-link"
                        >
                            Set up your account
                        </Link>
                    </div>
                </div>
                <nav
                    aria-label="Legal"
                    className="row"
                    style={{ gap: 20, fontSize: 13 }}
                >
                    <a
                        href="#"
                        style={{
                            color: "var(--muted)",
                            textDecoration: "none",
                        }}
                    >
                        Help
                    </a>
                    <a
                        href="#"
                        style={{
                            color: "var(--muted)",
                            textDecoration: "none",
                        }}
                    >
                        Privacy
                    </a>
                    <a
                        href="#"
                        style={{
                            color: "var(--muted)",
                            textDecoration: "none",
                        }}
                    >
                        Terms
                    </a>
                </nav>
            </main>
        </div>
    )
}
