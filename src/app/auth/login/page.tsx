import type { Metadata } from "next"
import Link from "next/link"
import { BrandMark } from "@/components/ui"
import LoginForm from "./LoginForm"

export const metadata: Metadata = { title: "Sign in" }

export default function LoginPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px 16px",
            }}
        >
            <div
                className="stack"
                style={{ width: "100%", maxWidth: 420, gap: 24 }}
            >
                <Link
                    href="/"
                    className="row"
                    style={{ gap: 10, color: "var(--ink)" }}
                >
                    <BrandMark />
                    <span className="display" style={{ fontSize: 18 }}>
                        HOAM
                    </span>
                </Link>
                <div className="card" style={{ padding: 28, gap: 20 }}>
                    <div className="stack" style={{ gap: 6 }}>
                        <h1 className="display" style={{ fontSize: 28 }}>
                            Sign in
                        </h1>
                        <p className="lead">
                            Use the email your HOA has on file. We&apos;ll take
                            you to the right portal.
                        </p>
                    </div>
                    <LoginForm />
                </div>
                <p className="text-md muted" style={{ textAlign: "center" }}>
                    New to the community? Ask your HOA manager for an invite.
                </p>
            </div>
        </div>
    )
}
