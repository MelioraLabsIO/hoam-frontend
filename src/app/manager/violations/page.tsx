import type { Metadata } from "next"
import Button from "@mui/material/Button"
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
                    <Button variant="contained">Log violation</Button>
                }
            />
            <ViolationsWorkspace />
        </>
    )
}
