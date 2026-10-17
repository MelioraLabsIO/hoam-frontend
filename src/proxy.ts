import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import {
    DEMO_MFA_COOKIE,
    DEMO_SESSION_COOKIE,
    isDemoMode,
    PORTAL_HOME,
    portalForPath,
    requiresTwoFactor,
    roleFromMetadata,
    SUPABASE_ANON_KEY,
    SUPABASE_URL,
    type Role,
} from "@/lib/auth/config"
import { decodeDemoMfa, decodeDemoSession } from "@/lib/auth/demo"

type SessionInfo = {
    role: Role
    mfaEnabled: boolean
    mfaVerified: boolean
} | null

/*
 * Next 16 "proxy" (formerly middleware). It keeps the Supabase session fresh and guards the portals:
 * - signed out → /auth/login
 * - wrong portal for the account's role → the user's own portal
 * - two-factor on but not entered yet → /auth/2fa
 * - manager without two-factor → /auth/2fa/setup (required for managers)
 */
export async function proxy(request: NextRequest) {
    let response = NextResponse.next({ request })
    let session: SessionInfo = null

    if (isDemoMode) {
        const demo = decodeDemoSession(
            request.cookies.get(DEMO_SESSION_COOKIE)?.value
        )
        if (demo) {
            const mfaEnabled = decodeDemoMfa(
                request.cookies.get(DEMO_MFA_COOKIE)?.value
            ).includes(demo.email)
            session = {
                role: demo.role,
                mfaEnabled,
                mfaVerified: demo.aal === 2,
            }
        }
    } else {
        const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    response = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        })
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (user) {
            const { data: aal } =
                await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
            session = {
                role: roleFromMetadata(user.app_metadata),
                mfaEnabled: aal?.nextLevel === "aal2",
                mfaVerified: aal?.currentLevel === "aal2",
            }
        }
    }

    const { pathname, search } = request.nextUrl
    const here = pathname + search

    // Redirect while keeping any refreshed Supabase cookies.
    const go = (path: string) => {
        const res = NextResponse.redirect(new URL(path, request.url))
        response.cookies.getAll().forEach((c) => res.cookies.set(c))
        return res
    }

    const portal = portalForPath(pathname)
    if (portal) {
        if (!session) return go(`/auth/login?next=${encodeURIComponent(here)}`)
        if (session.role !== portal) return go(PORTAL_HOME[session.role])
        if (session.mfaEnabled && !session.mfaVerified)
            return go(`/auth/2fa?next=${encodeURIComponent(here)}`)
        if (requiresTwoFactor(session.role) && !session.mfaEnabled) {
            return go(`/auth/2fa/setup?next=${encodeURIComponent(here)}`)
        }
        return response
    }

    // Two-factor screens need the password step first.
    if (pathname.startsWith("/auth/2fa") && !session) return go("/auth/login")

    // Already fully signed in: skip the sign-in screen.
    if (
        pathname === "/auth/login" &&
        session &&
        (!session.mfaEnabled || session.mfaVerified)
    ) {
        if (!requiresTwoFactor(session.role) || session.mfaEnabled)
            return go(PORTAL_HOME[session.role])
    }

    return response
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
