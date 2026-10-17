import type { Metadata } from "next"
import MaintenanceBoard from "./MaintenanceBoard"

export const metadata: Metadata = { title: "Maintenance" }

export default function TenantMaintenance() {
    return (
        <>
            <h1 className="h1">Maintenance</h1>
            <MaintenanceBoard />
        </>
    )
}
