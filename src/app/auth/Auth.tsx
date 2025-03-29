"use client"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabaseClient } from "../../../lib/supabaseClient"


export default function AuthUI() {
    return (
        <Auth
            supabaseClient={supabaseClient}
            appearance={{ theme: ThemeSupa }}
            redirectTo={`${window.location.origin}/auth/callback`}
        />
    )
}