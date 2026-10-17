import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Supabase redirects here after a magic link or OAuth sign-in.
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/"

    if (code) {
        const supabase = await createClient()
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(
        new URL(next.startsWith("/") ? next : "/", origin)
    )
}
