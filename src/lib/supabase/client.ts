import { createBrowserClient } from "@supabase/ssr"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/auth/config"

// Browser-side Supabase client. Reads the public URL and anon key from .env.local.
export function createClient() {
    return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
