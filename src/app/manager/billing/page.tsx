import type { Metadata } from "next"
import { KeyValue, PageHeader, StatCard } from "@/components/ui"
import BillingInvoices from "./BillingInvoices"

export const metadata: Metadata = { title: "Dues & billing" }

// Placeholder data until the Supabase tables exist.
const SCHEDULE: { label: string; value: string }[] = [
    { label: "Frequency", value: "Quarterly" },
    { label: "Assessment", value: "$265.00" },
    { label: "Reserve contribution", value: "$20.00" },
    { label: "Late fee", value: "$25 after 15 days" },
    { label: "Next invoices", value: "Jan 1, 2027" },
]

const AUTOPAY = { enrolled: 96, total: 228 }

export default function ManagerBilling() {
    const autopayPct = Math.round((AUTOPAY.enrolled / AUTOPAY.total) * 100)
    return (
        <>
            <PageHeader
                eyebrow="Q4 2026 billing cycle"
                title="Dues & billing"
                actions={
                    <>
                        <button type="button" className="btn">
                            Record payment
                        </button>
                        <button type="button" className="btn btn-primary">
                            Send reminders
                        </button>
                    </>
                }
            />

            <div className="grid-stats">
                <StatCard
                    label="Billed"
                    value="$64,980"
                    note="228 homes × $285"
                />
                <StatCard
                    label="Collected"
                    value={
                        <span style={{ color: "var(--primary-ink)" }}>
                            $40,280
                        </span>
                    }
                    note="141 homes paid"
                />
                <StatCard
                    label="Outstanding"
                    value="$24,700"
                    note="due Nov 1"
                />
                <StatCard
                    label="Past due (prior quarters)"
                    value="$3,420"
                    valueTone="amber"
                    note="9 homes · 2 on payment plans"
                />
            </div>

            <div className="split">
                <BillingInvoices />

                <aside className="split-side stack" style={{ gap: 16 }}>
                    <section className="card" style={{ gap: 12 }}>
                        <h2 className="h3">Assessment schedule</h2>
                        <div className="stack" style={{ gap: 10 }}>
                            {SCHEDULE.map((s) => (
                                <KeyValue
                                    key={s.label}
                                    label={s.label}
                                    value={s.value}
                                />
                            ))}
                        </div>
                        <button type="button" className="btn">
                            Edit schedule
                        </button>
                    </section>
                    <section className="card" style={{ gap: 12 }}>
                        <h2 className="h3">Autopay</h2>
                        <div
                            className="row"
                            style={{ alignItems: "baseline", gap: 8 }}
                        >
                            <span className="display" style={{ fontSize: 28 }}>
                                {AUTOPAY.enrolled}
                            </span>
                            <span className="text-md muted">
                                of {AUTOPAY.total} homes enrolled
                            </span>
                        </div>
                        <div
                            className="progress"
                            role="progressbar"
                            aria-label="Autopay enrollment"
                            aria-valuenow={autopayPct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
                            <span style={{ width: `${autopayPct}%` }} />
                        </div>
                        <button
                            type="button"
                            className="link-strong"
                            style={{
                                alignSelf: "flex-start",
                                background: "none",
                                border: 0,
                                padding: 0,
                                color: "var(--primary)",
                                cursor: "pointer",
                            }}
                        >
                            Invite the rest to enroll
                        </button>
                    </section>
                </aside>
            </div>
        </>
    )
}
