import type { ReactNode } from "react"
import PortalShell from "@/components/shells/PortalShell"
import { requireUser, shellUser } from "@/lib/auth/session"

export default async function TenantLayout({
    children,
}: {
    children: ReactNode
}) {
    const user = await requireUser("tenant")
    return (
        <PortalShell portal="tenant" user={shellUser(user)}>
            {children}
        </PortalShell>
    )
}
