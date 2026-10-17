import type { ReactNode } from "react"
import PortalShell from "@/components/shells/PortalShell"

export default function OwnerLayout({ children }: { children: ReactNode }) {
    return <PortalShell portal="owner">{children}</PortalShell>
}
