import type { ReactNode } from "react"
import PortalShell from "@/components/shells/PortalShell"
import { requireUser, shellUser } from "@/lib/auth/session"

export default async function OwnerLayout({
    children,
}: {
    children: ReactNode
}) {
    const user = await requireUser("owner")
    return (
        <PortalShell portal="owner" user={shellUser(user)}>
            {children}
        </PortalShell>
    )
}
