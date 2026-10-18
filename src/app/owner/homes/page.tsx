import type { Metadata } from "next"
import { PageHeader, Pill } from "@/components/ui"
import TenantAccess from "./TenantAccess"

export const metadata: Metadata = { title: "My homes & tenants" }

// Placeholder data until the Supabase tables exist.
const HOUSEHOLD = [
    { name: "Dana Ortega", role: "Owner · primary contact" },
    { name: "Luis Ortega", role: "Co-owner" },
]

export default function OwnerHomes() {
    return (
        <>
            <PageHeader
                title="My homes & tenants"
                actions={
                    <button type="button" className="btn btn-primary">
                        Invite a tenant
                    </button>
                }
            />

            <div className="split">
                <section
                    className="card"
                    style={{ flex: "1 1 380px", padding: 22, gap: 16 }}
                >
                    <div
                        className="row-wrap"
                        style={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 8,
                        }}
                    >
                        <div className="stack" style={{ gap: 4 }}>
                            <h2 className="h2-lg">14 Willow Bend Ct</h2>
                            <span className="text-md muted">
                                Lot 31 · single-family
                            </span>
                        </div>
                        <Pill tone="blue">
                            <span className="bold">You live here</span>
                        </Pill>
                    </div>
                    <div className="stack" style={{ gap: 4 }}>
                        <h3 className="text-md strong">Household</h3>
                        <div>
                            {HOUSEHOLD.map((m) => (
                                <div
                                    key={m.name}
                                    className="list-row"
                                    style={{
                                        justifyContent: "space-between",
                                        padding: "10px 0",
                                    }}
                                >
                                    <span>{m.name}</span>
                                    <span className="muted">{m.role}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <a href="#" className="link-strong">
                        Add a household member
                    </a>
                </section>

                <TenantAccess />
            </div>
        </>
    )
}
