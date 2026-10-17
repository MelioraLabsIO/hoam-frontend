import type { Metadata } from "next"
import { PageHeader } from "@/components/ui"
import ResidentsDirectory from "./ResidentsDirectory"

export const metadata: Metadata = { title: "Residents" }

export default function ManagerResidents() {
    return (
        <>
            <PageHeader
                eyebrow="228 homes · 412 residents"
                title="Residents"
                actions={
                    <>
                        <button type="button" className="btn">
                            Import CSV
                        </button>
                        <button type="button" className="btn btn-primary">
                            Add household
                        </button>
                    </>
                }
            />
            <ResidentsDirectory />
        </>
    )
}
