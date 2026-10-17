"use client"

import Link from "next/link"
import { LogoutIcon, UsersIcon } from "@/components/icons"
import { signOut } from "@/lib/supabase/actions"

export default function AccountMenu({
    initials,
    name,
    detail,
}: {
    initials: string
    name: string
    detail: string
}) {
    return (
        <details className="account">
            <summary className="avatar" aria-label={`Account, ${name}`}>
                {initials}
            </summary>
            <div className="account-menu">
                <div className="account-menu-head stack" style={{ gap: 2 }}>
                    <span className="strong" style={{ color: "var(--ink)" }}>
                        {name}
                    </span>
                    <span className="text-sm muted">{detail}</span>
                </div>
                <Link href="/" className="account-item">
                    <UsersIcon size={18} /> Switch portal
                </Link>
                <form action={signOut}>
                    <button type="submit" className="account-item">
                        <LogoutIcon size={18} /> Sign out
                    </button>
                </form>
            </div>
        </details>
    )
}
