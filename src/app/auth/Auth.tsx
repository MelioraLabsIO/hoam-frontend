"use client"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabaseClient } from "../../../lib/supabaseClient"
import { useEffect, useState } from "react"

export default function AuthUI() {
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true)
    }, [])

    return (
        <>
            {isBrowser && (
                <Auth
                    supabaseClient={supabaseClient}
                    appearance={{ theme: ThemeSupa }}
                    redirectTo={`${window.location.origin}/auth/callback`}
                />
            )}
        </>
    )
}