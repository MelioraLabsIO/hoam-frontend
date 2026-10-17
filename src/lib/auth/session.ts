import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"
import { createClient } from "@/lib/supabase/server"
import {
    DEMO_MFA_COOKIE,
    DEMO_SESSION_COOKIE,
    isDemoMode,
    PORTAL_HOME,
    roleFromMetadata,
    type Role,
} from "./config"
import { decodeDemoMfa, decodeDemoSession } from "./demo"

export type AppUser = {
    email: string
    name: string
    initials: string
    role: Role
    /** The user has a verified two-factor method. */
    mfaEnabled: boolean
    /** The current session already passed the two-factor step. */
    mfaVerified: boolean
}

function describe(email: string, role: Role, fullName?: string) {
    const name =
        fullName ||
        email
            .split("@")[0]
            .split(/[._-]+/)
            .filter(Boolean)
            .map((p) => p[0].toUpperCase() + p.slice(1))
            .join(" ") ||
        email
    const initials =
        name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "?"
    return { email, name, initials, role }
}

/** The signed-in user, or null. Cached per request. */
export const getCurrentUser = cache(async (): Promise<AppUser | null> => {
    if (isDemoMode) {
        const jar = await cookies()
        const session = decodeDemoSession(jar.get(DEMO_SESSION_COOKIE)?.value)
        if (!session) return null
        const mfaEnabled = decodeDemoMfa(
            jar.get(DEMO_MFA_COOKIE)?.value
        ).includes(session.email)
        return {
            ...describe(session.email, session.role),
            mfaEnabled,
            mfaVerified: session.aal === 2,
        }
    }

    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user?.email) return null

    const { data: aal } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    const role = roleFromMetadata(user.app_metadata)
    const fullName =
        typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : undefined
    return {
        ...describe(user.email, role, fullName),
        mfaEnabled: aal?.nextLevel === "aal2",
        mfaVerified: aal?.currentLevel === "aal2",
    }
})

/** Use in portal layouts: the signed-in user for that portal, or a redirect. */
export async function requireUser(portal: Role): Promise<AppUser> {
    const user = await getCurrentUser()
    if (!user) redirect(`/auth/login?next=${PORTAL_HOME[portal]}`)
    if (user.role !== portal) redirect(PORTAL_HOME[user.role])
    return user
}

export type MfaMethods = {
    app: boolean
    sms: boolean
    backup: boolean
    phoneHint?: string
}

/** Which verified two-factor methods the signed-in user has. Demo mode offers all of them. */
export async function getMfaMethods(): Promise<MfaMethods> {
    if (isDemoMode)
        return {
            app: true,
            sms: true,
            backup: true,
            phoneHint: "(•••) •••-4410",
        }
    const supabase = await createClient()
    const { data } = await supabase.auth.mfa.listFactors()
    const verified = (data?.all ?? []).filter((f) => f.status === "verified")
    return {
        app: verified.some((f) => f.factor_type === "totp"),
        sms: verified.some((f) => f.factor_type === "phone"),
        backup: verified.some((f) => f.factor_type === "recovery_code"),
    }
}

/** The few fields the portal shells show in the account menu. */
export type ShellUser = { initials: string; name: string; detail: string }

export function shellUser(user: AppUser): ShellUser {
    return { initials: user.initials, name: user.name, detail: user.email }
}
