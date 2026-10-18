/*
 * Auth configuration shared by the proxy, server code and client components.
 *
 * When NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set, every auth call goes
 * through the Supabase SDK. Until then the app runs in DEMO MODE: any email and password signs in,
 * and the session lives in a plain cookie. Demo mode is for building the UI only.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""

/** True only for real-looking values, so the placeholders from .env.example keep demo mode on. */
function looksReal(url: string, key: string) {
    if (!url || !key || /your-project|your-anon-key/i.test(url + key))
        return false
    try {
        return new URL(url).protocol.startsWith("http")
    } catch {
        return false
    }
}

export const isSupabaseConfigured = looksReal(SUPABASE_URL, SUPABASE_ANON_KEY)
export const isDemoMode = !isSupabaseConfigured

export type Role = "manager" | "owner" | "tenant"

export const PORTAL_HOME: Record<Role, string> = {
    manager: "/manager",
    owner: "/owner",
    tenant: "/tenant",
}

/** Which portal a path belongs to, if any. */
export function portalForPath(pathname: string): Role | null {
    for (const role of Object.keys(PORTAL_HOME) as Role[]) {
        const home = PORTAL_HOME[role]
        if (pathname === home || pathname.startsWith(`${home}/`)) return role
    }
    return null
}

/** Managers can see every home's billing and personal details, so two-factor is required for them. */
export function requiresTwoFactor(role: Role) {
    return role === "manager"
}

/**
 * Role for a signed-in user.
 * Supabase: read from app_metadata.role (only the service role can set it, so users can't promote themselves).
 * Demo mode: guessed from the email so every portal can be tried.
 */
export function roleFromMetadata(
    appMetadata: Record<string, unknown> | undefined
): Role {
    const role = appMetadata?.role
    return role === "manager" || role === "tenant" ? role : "owner"
}

export function demoRoleFromEmail(email: string): Role {
    const e = email.toLowerCase()
    if (e.includes("manager") || e.includes("admin") || e.includes("board"))
        return "manager"
    if (e.includes("tenant")) return "tenant"
    return "owner"
}

/** Only allow redirects to paths inside this app. */
export function safeNext(next: unknown, fallback = "/"): string {
    if (
        typeof next !== "string" ||
        !next.startsWith("/") ||
        next.startsWith("//")
    )
        return fallback
    return next
}

// Demo-mode cookies
export const DEMO_SESSION_COOKIE = "hoam-demo-session"
export const DEMO_MFA_COOKIE = "hoam-demo-mfa"
