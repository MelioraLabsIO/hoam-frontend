import type { Metadata } from "next"
import Typography from "@mui/material/Typography"
import MaintenanceBoard from "./MaintenanceBoard"

export const metadata: Metadata = { title: "Maintenance" }

export default function TenantMaintenance() {
    return (
        <>
            <Typography variant="h1">Maintenance</Typography>
            <MaintenanceBoard />
        </>
    )
}
