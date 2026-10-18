import Link from "next/link"
import { BrandMark } from "@/components/ui"

// Landing page: pick a portal. Based on the "Access by role" board in the design.
const PORTALS = [
    {
        href: "/manager",
        n: 1,
        name: "HOA Manager",
        text: "Board members and the management company. Runs billing, approvals, violations, amenities and communication for every home.",
        style: "dark",
    },
    {
        href: "/owner",
        n: 2,
        name: "Owner",
        text: "Whoever holds title to a home. Pays dues, answers violations, requests approvals, votes, and decides what their tenants can use.",
        style: "owner",
    },
    {
        href: "/tenant",
        n: 3,
        name: "Tenant",
        text: "Someone leasing a home. Gets news and rules, reports maintenance issues, and books amenities if the owner allows it. Never sees dues or violations.",
        style: "tenant",
    },
] as const

const ACCESS: [string, string, string, string][] = [
    [
        "Announcements & events",
        "Post, schedule, pin",
        "Read · owners-only posts too",
        "Read · all-resident posts only",
    ],
    [
        "Dues & payments",
        "Bill and track every home",
        "Pay own homes, autopay, statements",
        "",
    ],
    ["Budget & financials", "Full access", "Read published statements", ""],
    [
        "Maintenance requests",
        "Triage and assign all",
        "Submit and track",
        "Submit and track · owner copied",
    ],
    ["Architectural approvals", "Review and vote", "Submit for own homes", ""],
    [
        "Violations",
        "Issue, fine, schedule hearings",
        "See and respond for own homes",
        "",
    ],
    [
        "Amenity booking",
        "Set rules, calendar, block time",
        "Book",
        "Book if the owner allows it",
    ],
    [
        "Documents",
        "Everything, incl. board-only",
        "Governing docs, minutes, financials, forms",
        "Community rules and forms",
    ],
    ["Resident directory", "All homes and people", "", ""],
    [
        "Tenants & leases",
        "See who lives where",
        "Invite, set access, remove",
        "See own lease and household",
    ],
    ["Votes & proxies", "Run elections", "Vote or assign a proxy", ""],
]

function Cell({ value }: { value: string }) {
    return (
        <td
            style={{
                color: value ? "var(--ink)" : "var(--faint)",
                padding: "14px 12px",
            }}
        >
            {value || "Not shown"}
        </td>
    )
}

export default function Home() {
    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "32px clamp(16px, 4vw, 56px) 56px",
            }}
        >
            <div
                className="stack"
                style={{ maxWidth: 1160, margin: "0 auto", gap: 28 }}
            >
                <header className="spread" style={{ alignItems: "center" }}>
                    <div className="row" style={{ gap: 10 }}>
                        <BrandMark />
                        <span className="display" style={{ fontSize: 18 }}>
                            HOAM
                        </span>
                    </div>
                    <Link href="/auth/login" className="btn btn-primary">
                        Sign in
                    </Link>
                </header>

                <div
                    className="stack"
                    style={{ gap: 8, maxWidth: 720, paddingTop: 16 }}
                >
                    <div
                        className="overline"
                        style={{ fontSize: 14, fontWeight: 600 }}
                    >
                        Willow Creek HOA
                    </div>
                    <h1
                        className="display"
                        style={{ fontSize: "clamp(32px, 5vw, 40px)" }}
                    >
                        Who sees what
                    </h1>
                    <p
                        style={{
                            fontSize: 17,
                            lineHeight: 1.5,
                            color: "var(--muted)",
                            textWrap: "pretty",
                        }}
                    >
                        Three portals, one community. Each person signs in to
                        the portal for their role, and only sees what that role
                        allows.
                    </p>
                </div>

                <div className="grid-cards">
                    {PORTALS.map((p) => {
                        const dark = p.style === "dark"
                        const accent =
                            p.style === "tenant"
                                ? "var(--teal)"
                                : "var(--primary)"
                        return (
                            <Link
                                key={p.href}
                                href={p.href}
                                className={dark ? "card card-dark" : "card"}
                                style={
                                    dark
                                        ? { gap: 8 }
                                        : {
                                              gap: 8,
                                              border: `2px solid ${accent}`,
                                          }
                                }
                            >
                                <span
                                    className="overline"
                                    style={{
                                        color: dark
                                            ? "var(--nav-sub)"
                                            : p.style === "tenant"
                                              ? "var(--teal-fg)"
                                              : "var(--primary)",
                                    }}
                                >
                                    Portal {p.n}
                                </span>
                                <span
                                    className="display"
                                    style={{ fontSize: 24, letterSpacing: 0 }}
                                >
                                    {p.name}
                                </span>
                                <span
                                    style={{
                                        lineHeight: 1.45,
                                        color: dark
                                            ? "var(--nav-text)"
                                            : "var(--muted)",
                                    }}
                                >
                                    {p.text}
                                </span>
                            </Link>
                        )
                    })}
                </div>

                <section
                    className="card"
                    style={{ padding: "8px 20px 16px", gap: 0 }}
                >
                    <div className="table-wrap">
                        <table
                            className="table"
                            style={{ minWidth: 820, fontSize: 15 }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{ width: "24%", paddingTop: 16 }}
                                    >
                                        Feature
                                    </th>
                                    <th
                                        style={{
                                            width: "25%",
                                            color: "var(--ink)",
                                            fontWeight: 700,
                                        }}
                                    >
                                        HOA Manager
                                    </th>
                                    <th
                                        style={{
                                            width: "25%",
                                            color: "var(--primary)",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Owner
                                    </th>
                                    <th
                                        style={{
                                            width: "26%",
                                            color: "var(--teal-fg)",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Tenant
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ACCESS.map(([feature, m, o, t]) => (
                                    <tr key={feature}>
                                        <th
                                            scope="row"
                                            style={{
                                                color: "var(--ink)",
                                                fontWeight: 600,
                                                padding: "14px 12px 14px 0",
                                            }}
                                        >
                                            {feature}
                                        </th>
                                        <Cell value={m} />
                                        <Cell value={o} />
                                        <Cell value={t} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-md muted" style={{ marginTop: 14 }}>
                        “Not shown” means the screen doesn&apos;t exist in that
                        portal at all. It isn&apos;t greyed out or locked,
                        it&apos;s simply not there.
                    </p>
                </section>
            </div>
        </div>
    )
}
