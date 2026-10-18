import type { Metadata } from "next"
import Button from "@mui/material/Button"
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
                        <Button>Import CSV</Button>
                        <Button variant="contained">Add household</Button>
                    </>
                }
            />
            <ResidentsDirectory />
        </>
    )
}
