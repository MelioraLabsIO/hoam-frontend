import type { Metadata } from "next"
import { KeyValue } from "@/components/ui"
import HouseholdLists from "./HouseholdLists"

export const metadata: Metadata = { title: "My household" }

// Placeholder data until the Supabase tables exist.
const LEASE = {
    home: "9 Heron Way",
    term: "Aug 1, 2025 – Jul 31, 2027",
    landlord: "Dana Ortega",
    landlordFirst: "Dana",
}

export default function TenantHousehold() {
    return (
        <>
            <h1 className="h1">My household</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
                    gap: 16,
                    alignItems: "start",
                }}
            >
                <section className="card" style={{ gap: 12 }}>
                    <h2 className="h2">Lease</h2>
                    <div className="stack" style={{ gap: 8 }}>
                        <KeyValue label="Home" value={LEASE.home} />
                        <KeyValue label="Lease" value={LEASE.term} />
                        <KeyValue label="Landlord" value={LEASE.landlord} />
                    </div>
                    <a href="#" className="link-strong">
                        Message your landlord
                    </a>
                    <span className="text-sm muted">
                        Only your landlord can change lease details.
                    </span>
                </section>

                <HouseholdLists landlordFirst={LEASE.landlordFirst} />
            </div>
        </>
    )
}
