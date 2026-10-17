"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { ChevronDown } from "@/components/icons"
import { BrandMark, Pill } from "@/components/ui"
import AccountMenu from "./AccountMenu"
import type { ShellUser } from "@/lib/auth/session"
import "./shells.css"

type NavItem = { href: string; label: string; count?: number }

const PORTALS = {
    owner: {
        label: "Owner",
        tone: "blue" as const,
        home: "/owner",
        nav: [
            { href: "/owner", label: "Home" },
            { href: "/owner/dues", label: "Dues" },
            { href: "/owner/requests", label: "Requests" },
            { href: "/owner/violations", label: "Violations", count: 1 },
            { href: "/owner/amenities", label: "Amenities" },
            { href: "/owner/documents", label: "Documents" },
            { href: "/owner/homes", label: "My homes & tenants" },
        ] as NavItem[],
    },
    tenant: {
        label: "Tenant",
        tone: "teal" as const,
        home: "/tenant",
        nav: [
            { href: "/tenant", label: "Home" },
            { href: "/tenant/maintenance", label: "Maintenance" },
            { href: "/tenant/amenities", label: "Amenities" },
            { href: "/tenant/rules", label: "Community rules" },
            { href: "/tenant/household", label: "My household" },
        ] as NavItem[],
    },
}

export default function PortalShell({
    portal,
    user,
    children,
}: {
    portal: keyof typeof PORTALS
    user: ShellUser
    children: ReactNode
}) {
    const pathname = usePathname()
    const cfg = PORTALS[portal]
    const isActive = (href: string) =>
        href === cfg.home ? pathname === href : pathname.startsWith(href)

    return (
        <div className={portal === "tenant" ? "portal theme-tenant" : "portal"}>
            <header className="portal-header">
                <div className="portal-header-inner">
                    <div className="portal-top">
                        <Link href={cfg.home} className="portal-brand">
                            <BrandMark />
                            <span className="portal-brand-name">
                                Willow Creek
                            </span>
                            <Pill tone={cfg.tone}>
                                <span className="bold">{cfg.label}</span>
                            </Pill>
                        </Link>
                        <div className="row" style={{ gap: 10 }}>
                            {portal === "owner" ? (
                                <button
                                    type="button"
                                    className="btn btn-sm"
                                    aria-label="Switch home, 14 Willow Bend Ct selected"
                                >
                                    14 Willow Bend Ct{" "}
                                    <span
                                        className="muted"
                                        style={{ fontWeight: 500 }}
                                    >
                                        · 2 homes
                                    </span>
                                    <ChevronDown size={16} />
                                </button>
                            ) : (
                                <span className="text-md strong muted">
                                    9 Heron Way
                                </span>
                            )}
                            <AccountMenu {...user} />
                        </div>
                    </div>
                    <nav aria-label={cfg.label} className="portal-nav">
                        {cfg.nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="portal-link"
                                aria-current={
                                    isActive(item.href) ? "page" : undefined
                                }
                            >
                                {item.label}
                                {item.count !== undefined && (
                                    <span className="count-dot">
                                        {item.count}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>
            <main className="portal-main">{children}</main>
        </div>
    )
}
