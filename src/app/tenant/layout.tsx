import type { ReactNode } from "react"
import PortalShell from "@/components/shells/PortalShell"

export default function TenantLayout({ children }: { children: ReactNode }) {
    return <PortalShell portal="tenant">{children}</PortalShell>
}
