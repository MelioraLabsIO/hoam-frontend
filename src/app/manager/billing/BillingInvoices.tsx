"use client"

import { useState } from "react"
import { Pill, type Tone } from "@/components/ui"

type Status = "paid" | "due" | "past"

// Placeholder data until the Supabase tables exist.
const INVOICES: {
    home: string
    label: string
    amount: string
    status: Status
    method: string
}[] = [
    {
        home: "7 Heron Way",
        label: "Q4 2026",
        amount: "$285.00",
        status: "paid",
        method: "Autopay · Oct 1",
    },
    {
        home: "30 Marsh Lane",
        label: "Q4 2026",
        amount: "$285.00",
        status: "paid",
        method: "Card · Oct 3",
    },
    {
        home: "14 Willow Bend Ct",
        label: "Q4 2026",
        amount: "$285.00",
        status: "due",
        method: "—",
    },
    {
        home: "9 Heron Way",
        label: "Q4 2026",
        amount: "$285.00",
        status: "paid",
        method: "Autopay · Oct 1",
    },
    {
        home: "22 Marsh Lane",
        label: "Q3 2026",
        amount: "$285.00",
        status: "past",
        method: "—",
    },
    {
        home: "3 Cattail Court",
        label: "Q3 2026 + late fee",
        amount: "$310.00",
        status: "past",
        method: "Payment plan",
    },
    {
        home: "41 Willow Bend Ct",
        label: "Q4 2026",
        amount: "$285.00",
        status: "due",
        method: "—",
    },
]

const STATUS: Record<Status, { label: string; tone: Tone }> = {
    paid: { label: "Paid", tone: "blue" },
    due: { label: "Due Nov 1", tone: "gray" },
    past: { label: "Past due", tone: "amber" },
}

const TABS: { id: "all" | Status; label: string }[] = [
    { id: "all", label: "All" },
    { id: "paid", label: "Paid" },
    { id: "due", label: "Due" },
    { id: "past", label: "Past due" },
]

export default function BillingInvoices() {
    const [tab, setTab] = useState<"all" | Status>("all")
    const rows = INVOICES.filter((i) => tab === "all" || i.status === tab)

    return (
        <section className="card split-main">
            <div className="spread" style={{ alignItems: "center" }}>
                <h2 className="h2">Invoices</h2>
                <div
                    role="tablist"
                    aria-label="Invoice status"
                    className="tabs"
                >
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            role="tab"
                            className="tab"
                            aria-selected={tab === t.id}
                            aria-controls="billing-invoices"
                            onClick={() => setTab(t.id)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="table-wrap" id="billing-invoices" role="tabpanel">
                <table className="table" style={{ minWidth: 600 }}>
                    <thead>
                        <tr>
                            <th>Home</th>
                            <th>Invoice</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((i) => (
                            <tr key={i.home + i.label}>
                                <td className="strong">{i.home}</td>
                                <td className="muted">{i.label}</td>
                                <td className="strong">{i.amount}</td>
                                <td>
                                    <Pill tone={STATUS[i.status].tone}>
                                        {STATUS[i.status].label}
                                    </Pill>
                                </td>
                                <td className="muted">{i.method}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
