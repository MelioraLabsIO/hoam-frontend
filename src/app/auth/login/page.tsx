import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { Metadata } from "next"
import { AuthHeader, AuthNote, COMMUNITY } from "@/components/auth/AuthLayout"
import { isDemoMode } from "@/lib/auth/config"
import SignInForm from "./SignInForm"
import { SignInSplit } from "./SignInSplit"

export const metadata: Metadata = { title: "Sign in" }

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ next?: string }>
}) {
    const { next } = await searchParams
    return (
        <SignInSplit
            footer={
                <Stack
                    component="nav"
                    aria-label="Legal"
                    direction="row"
                    sx={{ alignItems: "center", gap: 2.5 }}
                >
                    {["Help", "Privacy", "Terms"].map((label) => (
                        <Link
                            key={label}
                            href="#"
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontWeight: "fontWeightRegular" }}
                        >
                            {label}
                        </Link>
                    ))}
                </Stack>
            }
        >
            <AuthHeader title="Sign in" variant="h1">
                Welcome back to {COMMUNITY}.
            </AuthHeader>
            <SignInForm next={next} />
            {isDemoMode && (
                <AuthNote>
                    <strong>Demo mode:</strong> no Supabase project is
                    connected yet, so any email and password signs in. Emails
                    containing <strong>manager</strong> open the HOA Manager
                    portal, <strong>tenant</strong> opens the Tenant portal,
                    and anything else opens the Owner portal.
                </AuthNote>
            )}
            <Box
                sx={{
                    pt: 2.25,
                    borderTop: 1,
                    borderColor: "border.main",
                }}
            >
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.5 }}
                >
                    Got an invite from your HOA or your landlord?{" "}
                    <Link href="/auth/forgot?invite=1">
                        Set up your account
                    </Link>
                </Typography>
            </Box>
        </SignInSplit>
    )
}
