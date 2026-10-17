"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import {
    DEMO_MFA_COOKIE,
    DEMO_SESSION_COOKIE,
    demoRoleFromEmail,
    isDemoMode,
    PORTAL_HOME,
    requiresTwoFactor,
    roleFromMetadata,
    safeNext,
    type Role,
} from "./config"
import {
    decodeDemoMfa,
    decodeDemoSession,
    encodeDemoMfa,
    encodeDemoSession,
} from "./demo"

export type FormState =
    | { error?: string; ok?: boolean; message?: string }
    | undefined

const DEMO_COOKIE_OPTS = {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
}

async function origin() {
    const h = await headers()
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000"
    const proto =
        h.get("x-forwarded-proto") ??
        (host.startsWith("localhost") ? "http" : "https")
    return `${proto}://${host}`
}

/** Where to send someone after the password step. */
function nextStep(role: Role, mfaEnabled: boolean, next: string) {
    if (mfaEnabled) return `/auth/2fa?next=${encodeURIComponent(next)}`
    if (requiresTwoFactor(role))
        return `/auth/2fa/setup?next=${encodeURIComponent(next)}`
    return next
}

// ---------- Sign in / out ----------

export async function signIn(
    _prev: FormState,
    formData: FormData
): Promise<FormState> {
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const remember = formData.get("remember") === "on"
    if (!email || !password) return { error: "Enter your email and password." }

    let role: Role
    let mfaEnabled: boolean

    if (isDemoMode) {
        // Demo mode: any email and password is accepted.
        role = demoRoleFromEmail(email)
        const jar = await cookies()
        mfaEnabled = decodeDemoMfa(jar.get(DEMO_MFA_COOKIE)?.value).includes(
            email
        )
        jar.set(
            DEMO_SESSION_COOKIE,
            encodeDemoSession({ email, role, aal: 1 }),
            {
                ...DEMO_COOKIE_OPTS,
                ...(remember ? { maxAge: 60 * 60 * 24 * 30 } : {}),
            }
        )
    } else {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error || !data.user)
            return {
                error: "That email and password don't match. Check them and try again.",
            }
        role = roleFromMetadata(data.user.app_metadata)
        const { data: aal } =
            await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
        mfaEnabled = aal?.nextLevel === "aal2"
    }

    const next = safeNext(formData.get("next"), PORTAL_HOME[role])
    redirect(
        nextStep(
            role,
            mfaEnabled,
            next.startsWith(PORTAL_HOME[role]) ? next : PORTAL_HOME[role]
        )
    )
}

export async function signOut() {
    if (isDemoMode) {
        ;(await cookies()).delete(DEMO_SESSION_COOKIE)
    } else {
        const supabase = await createClient()
        await supabase.auth.signOut()
    }
    redirect("/auth/login")
}

// ---------- Password reset ----------

export async function requestPasswordReset(
    _prev: FormState,
    formData: FormData
): Promise<FormState> {
    const email = String(formData.get("email") ?? "").trim()
    if (!email) return { error: "Enter the email you sign in with." }

    if (!isDemoMode) {
        const supabase = await createClient()
        // Supabase emails a link that lands on /auth/callback, which signs the user in and opens /auth/reset.
        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${await origin()}/auth/callback?next=/auth/reset`,
        })
        // Always report success so the form doesn't reveal which emails have accounts.
    }
    return { ok: true, message: email }
}

export async function updatePassword(
    _prev: FormState,
    formData: FormData
): Promise<FormState> {
    const password = String(formData.get("password") ?? "")
    const confirm = String(formData.get("confirm") ?? "")
    if (
        password.length < 10 ||
        !/[a-zA-Z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        return {
            error: "Use at least 10 characters with a letter and a number.",
        }
    }
    if (password !== confirm) return { error: "The passwords don't match." }

    if (!isDemoMode) {
        const supabase = await createClient()
        const { error } = await supabase.auth.updateUser({ password })
        if (error)
            return { error: "That reset link has expired. Request a new one." }
        // Sign out every session, including this one, so the user signs in with the new password.
        await supabase.auth.signOut({ scope: "global" })
    } else {
        ;(await cookies()).delete(DEMO_SESSION_COOKIE)
    }
    return { ok: true }
}

// ---------- Two-factor: verify at sign-in ----------

export async function verifyTwoFactor(
    _prev: FormState,
    formData: FormData
): Promise<FormState> {
    const method = String(formData.get("method") ?? "app")
    const code = String(formData.get("code") ?? "").replace(/\s/g, "")
    const next = safeNext(formData.get("next"), "/")

    const isBackup = method === "backup"
    if (
        isBackup
            ? !/^[a-z0-9]{16}$/i.test(code.replace(/-/g, ""))
            : !/^\d{6}$/.test(code)
    ) {
        return {
            error: isBackup
                ? "Enter a backup code like xxxx-xxxx-xxxx-xxxx."
                : "Enter the 6-digit code.",
        }
    }

    if (isDemoMode) {
        const jar = await cookies()
        const session = decodeDemoSession(jar.get(DEMO_SESSION_COOKIE)?.value)
        if (!session) redirect("/auth/login")
        jar.set(
            DEMO_SESSION_COOKIE,
            encodeDemoSession({ ...session, aal: 2 }),
            DEMO_COOKIE_OPTS
        )
        redirect(next === "/" ? PORTAL_HOME[session.role] : next)
    }

    const supabase = await createClient()
    if (isBackup) {
        const { error } = await supabase.auth.mfa.recoveryCodes.verify({ code })
        if (error?.code === "mfa_recovery_codes_locked") {
            return {
                error: "Too many tries. Wait a few minutes or use another way to verify.",
            }
        }
        if (error)
            return {
                error: "That backup code didn't work. It may have been used already.",
            }
    } else {
        const { data: factors } = await supabase.auth.mfa.listFactors()
        const factor = (
            method === "sms" ? factors?.phone : factors?.totp
        )?.find((f) => f.status === "verified")
        if (!factor)
            return {
                error: "That verification method isn't set up on your account.",
            }
        const { error } = await supabase.auth.mfa.challengeAndVerify({
            factorId: factor.id,
            code,
        })
        if (error)
            return { error: "That code didn't work. Check it and try again." }
    }

    const {
        data: { user },
    } = await supabase.auth.getUser()
    redirect(
        next === "/" ? PORTAL_HOME[roleFromMetadata(user?.app_metadata)] : next
    )
}

/** Sends a fresh SMS code when the user picks "Text a code" at sign-in. */
export async function sendSmsCode(): Promise<FormState> {
    if (isDemoMode) return { ok: true }
    const supabase = await createClient()
    const { data: factors } = await supabase.auth.mfa.listFactors()
    const phone = factors?.phone?.find((f) => f.status === "verified")
    if (!phone) return { error: "No phone number is set up for two-factor." }
    const { error } = await supabase.auth.mfa.challenge({ factorId: phone.id })
    return error
        ? { error: "We couldn't send a text right now. Try again shortly." }
        : { ok: true }
}

// ---------- Two-factor: set up ----------

export type Enrollment = {
    factorId: string
    qrCode?: string
    secret?: string
    challengeId?: string
    error?: string
}

/** Starts authenticator-app enrollment and returns the QR code and setup key. */
export async function enrollAuthenticator(): Promise<Enrollment> {
    if (isDemoMode) {
        return { factorId: "demo", secret: "DEMO KEY • NOT REAL" }
    }
    const supabase = await createClient()
    // Remove any half-finished enrollment so the user can start over.
    const { data: factors } = await supabase.auth.mfa.listFactors()
    for (const f of factors?.all ?? []) {
        if (f.status === "unverified")
            await supabase.auth.mfa.unenroll({ factorId: f.id })
    }
    const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "Authenticator app",
    })
    if (error || !data)
        return { factorId: "", error: "We couldn't start setup. Try again." }
    return {
        factorId: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
    }
}

/** Adds a phone number as a factor and texts it a code. */
export async function enrollPhone(phone: string): Promise<Enrollment> {
    if (!/^\+?[\d\s().-]{7,}$/.test(phone))
        return { factorId: "", error: "Enter a mobile number." }
    if (isDemoMode) return { factorId: "demo", challengeId: "demo" }
    const supabase = await createClient()
    const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "phone",
        phone,
    })
    if (error || !data)
        return { factorId: "", error: "We couldn't add that number." }
    const { data: challenge, error: cErr } = await supabase.auth.mfa.challenge({
        factorId: data.id,
    })
    if (cErr || !challenge)
        return {
            factorId: data.id,
            error: "We couldn't send a text right now.",
        }
    return { factorId: data.id, challengeId: challenge.id }
}

/** Confirms the first code, which turns two-factor on. */
export async function confirmEnrollment(
    factorId: string,
    code: string,
    challengeId?: string
): Promise<FormState> {
    if (!/^\d{6}$/.test(code)) return { error: "Enter the 6-digit code." }

    if (isDemoMode) {
        const jar = await cookies()
        const session = decodeDemoSession(jar.get(DEMO_SESSION_COOKIE)?.value)
        if (!session) return { error: "Your session ended. Sign in again." }
        const enrolled = decodeDemoMfa(jar.get(DEMO_MFA_COOKIE)?.value)
        jar.set(DEMO_MFA_COOKIE, encodeDemoMfa([...enrolled, session.email]), {
            ...DEMO_COOKIE_OPTS,
            maxAge: 60 * 60 * 24 * 365,
        })
        jar.set(
            DEMO_SESSION_COOKIE,
            encodeDemoSession({ ...session, aal: 2 }),
            DEMO_COOKIE_OPTS
        )
        return { ok: true }
    }

    const supabase = await createClient()
    const { error } = challengeId
        ? await supabase.auth.mfa.verify({ factorId, challengeId, code })
        : await supabase.auth.mfa.challengeAndVerify({ factorId, code })
    return error
        ? { error: "That code didn't work. Check it and try again." }
        : { ok: true }
}
