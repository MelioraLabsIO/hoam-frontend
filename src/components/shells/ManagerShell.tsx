"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"
import { LogoutIcon, MenuIcon, XIcon } from "@/components/icons"
import { BrandMark } from "@/components/ui"
import { signOut } from "@/lib/auth/actions"
import type { ShellUser } from "@/lib/auth/session"
import "./shells.css"

const NAV = [
    { href: "/manager", label: "Overview" },
    { href: "/manager/residents", label: "Residents" },
    { href: "/manager/billing", label: "Dues & billing" },
    { href: "/manager/requests", label: "Requests", count: 7 },
    { href: "/manager/violations", label: "Violations" },
    { href: "/manager/amenities", label: "Amenities" },
    { href: "/manager/announcements", label: "Announcements" },
    { href: "/manager/documents", label: "Documents" },
]

export default function ManagerShell({
    user,
    children,
}: {
    user: ShellUser
    children: ReactNode
}) {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const isActive = (href: string) =>
        href === "/manager" ? pathname === href : pathname.startsWith(href)

    return (
        <div className="mgr">
            <aside className="mgr-aside" data-open={open}>
                <div className="mgr-top">
                    <Link href="/manager" className="mgr-brand">
                        <BrandMark />
                        <span className="stack" style={{ gap: 0 }}>
                            <span className="mgr-brand-name">Willow Creek</span>
                            <span className="mgr-brand-sub">HOA Manager</span>
                        </span>
                    </Link>
                    <button
                        type="button"
                        className="mgr-toggle"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        onClick={() => setOpen((o) => !o)}
                    >
                        {open ? <XIcon /> : <MenuIcon />}
                    </button>
                </div>
                <nav aria-label="Manager" className="mgr-nav">
                    {NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="mgr-link"
                            aria-current={
                                isActive(item.href) ? "page" : undefined
                            }
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                            {item.count !== undefined && (
                                <span className="pill pill-dark">
                                    {item.count}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
                <div className="mgr-foot">
                    <div className="mgr-user">
                        <span className="avatar avatar-soft">
                            {user.initials}
                        </span>
                        <span className="stack" style={{ gap: 0, minWidth: 0 }}>
                            <span className="mgr-user-name">{user.name}</span>
                            <span className="mgr-user-email">
                                {user.detail}
                            </span>
                        </span>
                    </div>
                    <form action={signOut}>
                        <button
                            type="submit"
                            className="mgr-link"
                            style={{
                                width: "100%",
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                            }}
                        >
                            <span className="row" style={{ gap: 10 }}>
                                <LogoutIcon size={18} /> Sign out
                            </span>
                        </button>
                    </form>
                </div>
            </aside>
            <main className="mgr-main">{children}</main>
        </div>
    )
}
