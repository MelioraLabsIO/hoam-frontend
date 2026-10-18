import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { PORTAL_HOME, safeNext } from "@/lib/auth/config"
import { getCurrentUser, getMfaMethods } from "@/lib/auth/session"
import TwoFactorForm from "./TwoFactorForm"

export const metadata: Metadata = { title: "Two-factor verification" }

export default async function TwoFactorPage({
    searchParams,
}: {
    searchParams: Promise<{ next?: string }>
}) {
    const user = await getCurrentUser()
    if (!user) redirect("/auth/login")
    const next = safeNext((await searchParams).next, PORTAL_HOME[user.role])
    if (user.mfaVerified) redirect(next)

    const methods = await getMfaMethods()
    return (
        <AuthLayout
            footer={
                <>
                    Lost your phone and your backup codes?{" "}
                    <a href="mailto:">Contact HOA management</a> to verify your
                    identity.
                </>
            }
        >
            <TwoFactorForm next={next} methods={methods} />
        </AuthLayout>
    )
}
