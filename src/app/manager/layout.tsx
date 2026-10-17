import type { ReactNode } from "react"
import ManagerShell from "@/components/shells/ManagerShell"
import { requireUser, shellUser } from "@/lib/auth/session"

export default async function ManagerLayout({
    children,
}: {
    children: ReactNode
}) {
    const user = await requireUser("manager")
    return <ManagerShell user={shellUser(user)}>{children}</ManagerShell>
}
