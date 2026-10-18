import type { Metadata } from "next"
import { PageHeader } from "@/components/ui"
import ViolationsWorkspace from "./ViolationsWorkspace"

export const metadata: Metadata = { title: "Violations" }

export default function ManagerViolations() {
    return (
        <>
            <PageHeader
                eyebrow="5 open · 2 past their resolve-by date"
                title="Violations"
                actions={
                    <button type="button" className="btn btn-primary">
                        Log violation
                    </button>
                }
            />
            <ViolationsWorkspace />
        </>
    )
}
