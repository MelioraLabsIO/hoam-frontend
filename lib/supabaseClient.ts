import { createClient } from "@supabase/supabase-js"

// These should be defined in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseClient = createClient(supabaseUrl as string, supabaseKey as string)