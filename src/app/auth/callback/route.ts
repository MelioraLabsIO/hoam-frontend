import { NextResponse } from "next/server"
import { isSupabaseConfigured, safeNext } from "@/lib/auth/config"
import { createClient } from "@/lib/supabase/server"

// Supabase email links (password reset, invites) land here, then continue to `next`.
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = safeNext(searchParams.get("next"), "/")

    if (code && isSupabaseConfigured) {
        const supabase = await createClient()
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(new URL(next, origin))
}
