import { createServerClient } from "@supabase/ssr"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/auth/config"
import { cookies } from "next/headers"

// Server-side Supabase client for Server Components, Route Handlers and Server Actions.
export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        // Recovery codes back the "backup codes" screens (experimental in the SDK).
        auth: { experimental: { recoveryCodes: true } },
        cookies: {
            getAll() {
                return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    )
                } catch {
                    // Called from a Server Component, where cookies are read-only. The proxy refreshes them instead.
                }
            },
        },
    })
}
