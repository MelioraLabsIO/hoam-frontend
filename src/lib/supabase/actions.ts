"use server"

import { redirect } from "next/navigation"
import { createClient } from "./server"

export async function signOut() {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const supabase = await createClient()
        await supabase.auth.signOut()
    }
    redirect("/auth/login")
}
