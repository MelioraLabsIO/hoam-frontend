import type { Metadata } from "next"
import Link from "next/link"
import { AuthHeader, AuthLayout } from "@/components/auth/AuthLayout"
import { isDemoMode } from "@/lib/auth/config"
import { getCurrentUser } from "@/lib/auth/session"
import ResetForm from "./ResetForm"

export const metadata: Metadata = { title: "Choose a new password" }

export default async function ResetPage() {
    // The emailed link signs the user in through /auth/callback, so a session must exist here.
    const user = await getCurrentUser()
    const footer = (
        <>
            Link expired? <Link href="/auth/forgot">Request a new one</Link>
        </>
    )

    if (!user && !isDemoMode) {
        return (
            <AuthLayout footer={footer}>
                <AuthHeader title="This link has expired">
                    Reset links work once and expire after 30 minutes. Request a
                    new one to choose your password.
                </AuthHeader>
                <Link href="/auth/forgot" className="auth-btn">
                    Request a new link
                </Link>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout footer={footer}>
            <ResetForm email={user?.email} />
        </AuthLayout>
    )
}
