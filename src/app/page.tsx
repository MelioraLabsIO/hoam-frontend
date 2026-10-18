import { Landing } from "./_landing/Landing"

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

export default function Home() {
    return <Landing portals={PORTALS} access={ACCESS} />
}
