"use client"

import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import InputAdornment from "@mui/material/InputAdornment"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { useActionState, useState } from "react"
import { AuthAlert } from "@/components/auth/AuthLayout"
import { signIn } from "@/lib/auth/actions"

export default function SignInForm({ next }: { next?: string }) {
    const [state, action, pending] = useActionState(signIn, undefined)
    const [shown, setShown] = useState(false)
    const error = state?.error

    return (
        <Stack component="form" action={action} sx={{ gap: 2 }}>
            {error && <AuthAlert>{error}</AuthAlert>}
            {next && <input type="hidden" name="next" value={next} />}
            <TextField
                id="si-email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                size="medium"
                slotProps={{ htmlInput: { required: true } }}
            />
            <Stack sx={{ gap: 0.75 }}>
                <Stack
                    direction="row"
                    sx={{
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: 1.5,
                    }}
                >
                    <FormLabel htmlFor="si-pw">Password</FormLabel>
                    <Link href="/auth/forgot" variant="label">
                        Forgot password?
                    </Link>
                </Stack>
                <TextField
                    id="si-pw"
                    name="password"
                    type={shown ? "text" : "password"}
                    autoComplete="current-password"
                    size="medium"
                    error={Boolean(error)}
                    slotProps={{
                        htmlInput: { required: true },
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        variant="text"
                                        size="small"
                                        aria-pressed={shown}
                                        aria-label={
                                            shown
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        onClick={() => setShown((s) => !s)}
                                        sx={(theme) => ({
                                            minHeight: theme.layout.control.sm,
                                            px: 1.5,
                                        })}
                                    >
                                        {shown ? "Hide" : "Show"}
                                    </Button>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Stack>
            <FormControlLabel
                control={<Checkbox name="remember" />}
                label="Keep me signed in on this device"
                sx={{ "& .MuiFormControlLabel-label": { typography: "body1" } }}
            />
            <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={pending}
            >
                {pending ? "Signing in…" : "Sign in"}
            </Button>
        </Stack>
    )
}
