# HOAM · Homeowner Association Management

Next.js 16 (App Router) + React 19 + Supabase. The UI follows the "HOA App" Claude design canvas.

## Portals

| Portal | Route | Shell |
|---|---|---|
| Portal chooser | `/` | none |
| Sign in | `/auth/login` | none |
| HOA Manager | `/manager/*` | dark sidebar |
| Owner | `/owner/*` | top tabs, blue |
| Tenant | `/tenant/*` | top tabs, teal |

Screens use placeholder data until the Supabase tables exist.

## Design system

- Tokens and component classes: `src/app/globals.css` (`.card`, `.btn`, `.pill`, `.table`, …)
- React helpers: `src/components/ui.tsx`, icons in `src/components/icons.tsx`
- Shells: `src/components/shells/`
- Fonts: Bricolage Grotesque (display) and Figtree (body) via `next/font`

## Getting started

```bash
cp .env.example .env.local   # add your Supabase URL and anon key
npm install
npm run dev
```

`npm run lint` runs ESLint, `npm run build` builds for production.
