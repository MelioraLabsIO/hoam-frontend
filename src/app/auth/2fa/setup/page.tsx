import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { PORTAL_HOME, requiresTwoFactor, safeNext } from "@/lib/auth/config"
import { getCurrentUser } from "@/lib/auth/session"
import SetupForm from "./SetupForm"

export const metadata: Metadata = { title: "Set up two-factor authentication" }

export default async function TwoFactorSetupPage({
    searchParams,
}: {
    searchParams: Promise<{ next?: string }>
}) {
    const user = await getCurrentUser()
    if (!user) redirect("/auth/login")
    const next = safeNext((await searchParams).next, PORTAL_HOME[user.role])
    // Already on: finish the sign-in step instead of enrolling twice.
    if (user.mfaEnabled)
        redirect(
            user.mfaVerified
                ? next
                : `/auth/2fa?next=${encodeURIComponent(next)}`
        )

    return (
        <AuthLayout size="lg" brandLink={false}>
            <SetupForm next={next} required={requiresTwoFactor(user.role)} />
        </AuthLayout>
    )
}
