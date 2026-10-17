import type { Metadata } from "next"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { isDemoMode } from "@/lib/auth/config"
import ForgotForm from "./ForgotForm"

export const metadata: Metadata = { title: "Reset your password" }

export default async function ForgotPage({
    searchParams,
}: {
    searchParams: Promise<{ invite?: string }>
}) {
    const { invite } = await searchParams
    return (
        <AuthLayout>
            <ForgotForm invite={invite === "1"} demo={isDemoMode} />
        </AuthLayout>
    )
}
