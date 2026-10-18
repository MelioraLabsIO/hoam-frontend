# HOAM · Homeowner Association Management

Next.js 16 (App Router) + React 19 + Supabase. The UI follows the "HOA App" Claude design canvas.

## Portals

| Portal | Route | Shell |
|---|---|---|
| Portal chooser | `/` | none |
| Sign in, password reset, two-factor | `/auth/*` | none |
| HOA Manager | `/manager/*` | dark sidebar |
| Owner | `/owner/*` | top tabs, blue |
| Tenant | `/tenant/*` | top tabs, teal |

Screens use placeholder data until the Supabase tables exist.

## Authentication

Auth uses the Supabase SDK (`@supabase/ssr`). The code is in `src/lib/auth/`, the screens in `src/app/auth/`, and route protection in `src/proxy.ts`.

**Demo mode.** Until `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set, any email and password signs in, and the session is kept in a plain, unsigned cookie. The email picks the portal:

| Email contains | Portal |
|---|---|
| `manager`, `admin` or `board` | HOA Manager (must set up two-factor) |
| `tenant` | Tenant |
| anything else | Owner |

Demo mode is for building the UI only. Never deploy it to real users.

**Connecting Supabase.** Add the two variables to `.env.local` (and to Vercel), then in the Supabase dashboard:

1. Enable Email sign-in, and add `<your site>/auth/callback` to the allowed redirect URLs (password reset links land there).
2. Enable MFA: TOTP, plus Phone if you want text-message codes, and recovery codes for the backup-codes screen.
3. Set each user's role in `app_metadata.role` (`manager`, `owner` or `tenant`) with the service key. Users without one are treated as owners.

| Screen | Route | Supabase call |
|---|---|---|
| Sign in | `/auth/login` | `signInWithPassword` |
| Forgot password / set up account | `/auth/forgot` | `resetPasswordForEmail` |
| Choose a new password | `/auth/reset` | `updateUser` |
| Two-factor code | `/auth/2fa` | `mfa.challengeAndVerify`, `mfa.recoveryCodes.verify` |
| Set up two-factor | `/auth/2fa/setup` | `mfa.enroll`, `mfa.verify` |
| Backup codes | `/auth/2fa/backup` | `mfa.recoveryCodes.generate` |

Not wired yet: the "Don't ask again on this device for 30 days" checkbox, and the sign-in attempt limit shown in the design.

## Design system

- Tokens and component classes: `src/app/globals.css` (`.card`, `.btn`, `.pill`, `.table`, …)
- React helpers: `src/components/ui.tsx`, icons in `src/components/icons.tsx`
- Shells: `src/components/shells/`
- Fonts: Bricolage Grotesque (display) and Figtree (body) via `next/font`

## Getting started

```bash
cp .env.example .env.local   # leave empty for demo mode, or add your Supabase URL and anon key
npm install
npm run dev
```

`npm run lint` runs ESLint, `npm run build` builds for production.
