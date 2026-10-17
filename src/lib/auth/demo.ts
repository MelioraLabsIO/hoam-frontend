import type { Role } from "./config"

/*
 * Demo-mode session, stored as base64 JSON in a cookie. It is NOT signed or secure:
 * it only exists so the screens can be used before a Supabase project is connected.
 */

export type DemoSession = {
    email: string
    role: Role
    /** 1 = password only, 2 = password + two-factor code */
    aal: 1 | 2
}

export function encodeDemoSession(session: DemoSession) {
    return Buffer.from(JSON.stringify(session)).toString("base64url")
}

export function decodeDemoSession(
    value: string | undefined
): DemoSession | null {
    if (!value) return null
    try {
        const json =
            typeof atob === "function"
                ? atob(value.replace(/-/g, "+").replace(/_/g, "/"))
                : ""
        const data = JSON.parse(json) as Partial<DemoSession>
        if (typeof data.email !== "string" || !data.role) return null
        return {
            email: data.email,
            role: data.role,
            aal: data.aal === 2 ? 2 : 1,
        }
    } catch {
        return null
    }
}

/** Emails that "turned on" two-factor in demo mode, kept across sign-outs. */
export function decodeDemoMfa(value: string | undefined): string[] {
    if (!value) return []
    try {
        const list = JSON.parse(decodeURIComponent(value))
        return Array.isArray(list)
            ? list.filter((x) => typeof x === "string")
            : []
    } catch {
        return []
    }
}

export function encodeDemoMfa(emails: string[]) {
    return encodeURIComponent(JSON.stringify(Array.from(new Set(emails))))
}
