"use client"

import Link from "next/link"
import { useState } from "react"
import { AuthHeader, COMMUNITY } from "@/components/auth/AuthLayout"

export default function BackupCodes({
    codes,
    next,
    demo,
}: {
    codes: string[]
    next: string
    demo: boolean
}) {
    const [saved, setSaved] = useState(false)
    const [copied, setCopied] = useState(false)
    const text = `${COMMUNITY} backup codes\nEach code works once.\n\n${codes.join("\n")}\n`

    function download() {
        const url = URL.createObjectURL(
            new Blob([text], { type: "text/plain" })
        )
        const a = document.createElement("a")
        a.href = url
        a.download = "willow-creek-backup-codes.txt"
        a.click()
        URL.revokeObjectURL(url)
    }

    async function copy() {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
        } catch {
            setCopied(false)
        }
    }

    return (
        <>
            <div
                className="row auth-print-hide"
                style={{
                    gap: 10,
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--primary-ink)",
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="m5 12 4.5 4.5L19 7" />
                </svg>
                Two-factor authentication is on
            </div>
            <AuthHeader title="Save your backup codes">
                If you lose your phone, each of these codes lets you sign in
                once. Keep them somewhere safe, like a password manager. We
                won&apos;t show them again.
            </AuthHeader>

            <ul
                aria-label="Backup codes"
                className="auth-codes"
                style={{ margin: 0, listStyle: "none" }}
            >
                {codes.map((c) => (
                    <li key={c} style={{ display: "contents" }}>
                        <span>{c}</span>
                    </li>
                ))}
            </ul>
            {demo && (
                <div className="auth-note auth-print-hide" role="note">
                    <strong style={{ color: "var(--ink)" }}>Demo mode:</strong>{" "}
                    these codes are examples and aren&apos;t saved anywhere.
                </div>
            )}

            <div className="row-wrap auth-print-hide" style={{ gap: 10 }}>
                <button
                    type="button"
                    className="btn btn-flex"
                    onClick={download}
                >
                    Download
                </button>
                <button type="button" className="btn btn-flex" onClick={copy}>
                    {copied ? "Copied" : "Copy"}
                </button>
                <button
                    type="button"
                    className="btn btn-flex"
                    onClick={() => window.print()}
                >
                    Print
                </button>
            </div>

            <label
                className="auth-check auth-print-hide"
                style={{ minHeight: 44, fontWeight: 600 }}
            >
                <input
                    type="checkbox"
                    checked={saved}
                    onChange={(e) => setSaved(e.target.checked)}
                    style={{ width: 20, height: 20 }}
                />
                I&apos;ve saved my backup codes
            </label>

            {saved ? (
                <Link href={next} className="auth-btn auth-print-hide">
                    Continue to {COMMUNITY}
                </Link>
            ) : (
                <button
                    type="button"
                    className="auth-btn auth-print-hide"
                    disabled
                >
                    Continue to {COMMUNITY}
                </button>
            )}
        </>
    )
}
