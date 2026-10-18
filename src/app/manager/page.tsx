import type { Metadata } from "next"
import Link from "next/link"
import {
    PageHeader,
    Pill,
    SectionHeader,
    StatCard,
    TextLink,
    type Tone,
} from "@/components/ui"
import QuickAnnouncement from "./QuickAnnouncement"

export const metadata: Metadata = { title: "Overview" }

// Placeholder data until the Supabase tables exist.
const REQUESTS: {
    title: string
    home: string
    status: string
    tone: Tone
    age: string
}[] = [
    {
        title: "Fence replacement — cedar",
        home: "14 Willow Bend",
        status: "Needs vote",
        tone: "gray",
        age: "6d",
    },
    {
        title: "Streetlight out, cluster B",
        home: "Common area",
        status: "Vendor booked",
        tone: "teal",
        age: "3d",
    },
    {
        title: "Solar panel install",
        home: "7 Heron Way",
        status: "Needs vote",
        tone: "gray",
        age: "2d",
    },
    {
        title: "Gate keypad unresponsive",
        home: "North entrance",
        status: "New",
        tone: "amber",
        age: "4h",
    },
]

const PAST_DUE = [
    {
        home: "22 Marsh Lane",
        detail: "2 quarters · last reminder Oct 1",
        amount: "$570.00",
    },
    {
        home: "3 Cattail Court",
        detail: "1 quarter + late fee · payment plan",
        amount: "$310.00",
    },
    {
        home: "41 Willow Bend",
        detail: "1 quarter · no reminder yet",
        amount: "$285.00",
    },
    {
        home: "18 Heron Way",
        detail: "1 quarter · last reminder Oct 1",
        amount: "$285.00",
    },
]

const BOOKINGS = [
    {
        dow: "FRI",
        day: 16,
        title: "Clubhouse · Birthday party",
        detail: "2–6 PM · 9 Heron Way",
        tone: "blue",
    },
    {
        dow: "SAT",
        day: 17,
        title: "Tennis · Court 1",
        detail: "10 AM–12 PM · 30 Marsh Ln",
        tone: "teal",
    },
    {
        dow: "SUN",
        day: 18,
        title: "Clubhouse · Book club",
        detail: "2–4 PM · 14 Willow Bend",
        tone: "blue",
    },
]

export default function ManagerOverview() {
    return (
        <>
            <PageHeader
                eyebrow="Q4 · Week of Oct 12"
                title="Overview"
                actions={
                    <>
                        <button type="button" className="btn">
                            Export report
                        </button>
                        <Link
                            href="/manager/announcements"
                            className="btn btn-primary"
                        >
                            New announcement
                        </Link>
                    </>
                }
            />

            <div className="grid-stats">
                <StatCard
                    label="Q4 dues collected"
                    value="62%"
                    progress={62}
                    note="$40,280 of $64,980 · due Nov 1"
                />
                <StatCard
                    label="Past due 30+ days"
                    value="$3,420"
                    valueTone="amber"
                    note="9 households"
                />
                <StatCard
                    label="Open requests"
                    value="7"
                    note="3 maintenance · 4 architectural"
                />
                <StatCard
                    label="Open violations"
                    value="5"
                    note="2 past their resolve-by date"
                />
            </div>

            <div className="grid-wide">
                <section className="card">
                    <SectionHeader
                        title="Request queue"
                        action={
                            <TextLink href="/manager/requests">
                                View all
                            </TextLink>
                        }
                    />
                    <div className="table-wrap">
                        <table className="table" style={{ minWidth: 440 }}>
                            <thead>
                                <tr>
                                    <th>Request</th>
                                    <th>Home</th>
                                    <th>Status</th>
                                    <th>Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {REQUESTS.map((r) => (
                                    <tr key={r.title}>
                                        <td className="strong">{r.title}</td>
                                        <td className="muted">{r.home}</td>
                                        <td>
                                            <Pill tone={r.tone}>
                                                {r.status}
                                            </Pill>
                                        </td>
                                        <td className="muted">{r.age}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="card">
                    <SectionHeader
                        title="Past-due accounts"
                        action={
                            <TextLink href="/manager/billing">
                                Send reminders
                            </TextLink>
                        }
                    />
                    <div className="stack" style={{ gap: 0 }}>
                        {PAST_DUE.map((a) => (
                            <div className="list-row" key={a.home}>
                                <div className="stack grow" style={{ gap: 2 }}>
                                    <span className="strong">{a.home}</span>
                                    <span className="text-sm muted">
                                        {a.detail}
                                    </span>
                                </div>
                                <span className="amount-due">{a.amount}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="card">
                    <SectionHeader
                        title="Bookings this week"
                        action={
                            <TextLink href="/manager/amenities">
                                Calendar
                            </TextLink>
                        }
                    />
                    <div className="stack" style={{ gap: 10 }}>
                        {BOOKINGS.map((b) => (
                            <div
                                className="row"
                                style={{ gap: 14 }}
                                key={b.title + b.day}
                            >
                                <div
                                    className="stack"
                                    style={{
                                        width: 52,
                                        gap: 0,
                                        textAlign: "center",
                                        flex: "0 0 auto",
                                    }}
                                >
                                    <span className="text-sm bold muted">
                                        {b.dow}
                                    </span>
                                    <span
                                        className="display"
                                        style={{ fontSize: 20 }}
                                    >
                                        {b.day}
                                    </span>
                                </div>
                                <div
                                    className={`block block-${b.tone} grow`}
                                    style={{
                                        padding: "10px 14px",
                                        borderRadius: 12,
                                    }}
                                >
                                    <div className="spread">
                                        <span
                                            className="strong"
                                            style={{ fontSize: 15 }}
                                        >
                                            {b.title}
                                        </span>
                                        <span className="text-md">
                                            {b.detail}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <QuickAnnouncement />
            </div>
        </>
    )
}
