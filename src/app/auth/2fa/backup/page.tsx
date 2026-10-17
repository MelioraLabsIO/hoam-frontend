import { randomInt } from "node:crypto"
import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { AuthHeader, AuthLayout } from "@/components/auth/AuthLayout"
import { isDemoMode, PORTAL_HOME, safeNext } from "@/lib/auth/config"
import { getCurrentUser } from "@/lib/auth/session"
import { createClient } from "@/lib/supabase/server"
import BackupCodes from "./BackupCodes"

export const metadata: Metadata = { title: "Save your backup codes" }

const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789"

/** Supabase returns 16 lowercase characters; show them in blocks of four. */
const format = (code: string) => code.match(/.{1,4}/g)?.join("-") ?? code

function demoCode() {
    return Array.from(
        { length: 16 },
        () => ALPHABET[randomInt(ALPHABET.length)]
    ).join("")
}

type Result = { codes: string[] } | { error: "exists" | "failed" }

async function generateCodes(): Promise<Result> {
    if (isDemoMode) return { codes: Array.from({ length: 10 }, demoCode) }
    const supabase = await createClient()
    const { data, error } = await supabase.auth.mfa.recoveryCodes.generate({
        friendlyName: "Backup codes",
    })
    if (error?.code === "mfa_verified_factor_exists") return { error: "exists" }
    if (error || !data) return { error: "failed" }
    return { codes: data.codes }
}

export default async function BackupCodesPage({
    searchParams,
}: {
    searchParams: Promise<{ next?: string }>
}) {
    const user = await getCurrentUser()
    if (!user) redirect("/auth/login")
    if (!user.mfaEnabled) redirect("/auth/2fa/setup")
    const next = safeNext((await searchParams).next, PORTAL_HOME[user.role])
    const footer =
        "You can make new codes any time from Account › Security. Making new ones cancels these."

    const result = await generateCodes()
    if ("error" in result) {
        return (
            <AuthLayout size="md" brandLink={false} footer={footer}>
                <AuthHeader
                    title={
                        result.error === "exists"
                            ? "You already have backup codes"
                            : "Backup codes aren't available"
                    }
                >
                    {result.error === "exists"
                        ? "Use the codes you saved earlier. Each one works once."
                        : "We couldn't make backup codes right now. Two-factor is still on, and you can make codes later from Account › Security."}
                </AuthHeader>
                <Link href={next} className="auth-btn">
                    Continue
                </Link>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout size="md" brandLink={false} footer={footer}>
            <BackupCodes
                codes={result.codes.map(format)}
                next={next}
                demo={isDemoMode}
            />
        </AuthLayout>
    )
}
