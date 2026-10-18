# HOAM theme

The whole UI is built with [MUI](https://mui.com/material-ui/) (v9) on one global
theme. Components never carry their own colours, font sizes, radii or shadows:
everything comes from the theme, so light and dark mode (and the tenant teal
accent) work everywhere.

| File | What it holds |
| --- | --- |
| `tokens.ts` | Raw design values: light and dark palettes, radii, icon sizes, layout measures. The only place hex codes and pixel sizes live. |
| `theme.ts` | `createTheme` with CSS variables, both colour schemes, typography variants, spacing, shadows and overrides for every MUI component we use. |
| `augment.d.ts` | TypeScript additions (extra palette roles, typography variants, component variants). |
| `accent.ts` | `accentScope("teal")` re-points `primary` at teal for the tenant portal. |
| `ThemeRegistry.tsx` | Emotion cache for the App Router, `ThemeProvider` and `CssBaseline`. |
| `NextLinkComposed.tsx` | Makes `Button`, `Link`, `ListItemButton`, `Tab`, `Card`… with `href` navigate through `next/link`. |

Colour mode follows the device by default. People can switch Light / Dark /
Match device from the account menu, the manager sidebar or the auth screens
(`ColorModeToggle`).

## Rules for components

- Use MUI components, not raw HTML elements, for anything MUI has: `Button`,
  `IconButton`, `TextField` (also `select`), `Checkbox`, `Radio`, `Switch`,
  `FormControlLabel`, `ToggleButtonGroup`, `Tabs`, `Chip`, `Alert`, `Card`,
  `Paper`, `Table*`, `List*`, `Menu`, `Avatar`, `LinearProgress`, `Typography`,
  `Link`, `Stack`, `Box`, `Divider`.
- No literal colours (`#…`, `rgb(…)`), font sizes, font weights, radii or
  shadows in components. Use:
  - colours: palette paths such as `"text.secondary"`, `"primary.main"`,
    `"amber.dark"`, `"background.muted"`, `"divider"`, `"border.main"`;
  - text: `Typography` variants (`h1`…`h6`, `body1`, `body2`, `caption`,
    `subtitle1`, `subtitle2`, `overline`, `lead`, `label`, `stat`, `micro`,
    `tiny`, `brand`, `code`, `mono`…) and `fontWeight: "fontWeightSemiBold"`
    style keys in `sx`;
  - spacing: theme units in `sx` (`gap: 1.5` = 12px, `p: 2.5` = 20px);
  - radii, fixed sizes: `theme.radius.*` and `theme.layout.*` inside an
    `sx={(theme) => …}` callback (client components only).
- Shared building blocks are in `src/components/ui.tsx` (`PageHeader`,
  `SectionHeader`, `StatCard`, `Pill`, `CountDot`, `DateTile`, `EventRow`,
  `Announcement`, `KeyValue`, `TextLink`, `Initials`, `ListRow`, `Tile`,
  `CalendarBlock`, `IconTile`, `AutoGrid`, `Split`, `VisuallyHidden`).
- Icons are MUI `SvgIcon`s in `src/components/icons.tsx`; size them with
  `fontSize="xsmall" | "small" | "medium" | "large" | "xlarge"`.

## Component cheat sheet

| Design element | MUI |
| --- | --- |
| Plain white button | `<Button>` (outlined is the default variant) |
| Primary button | `<Button variant="contained">` |
| Small / large button | `size="small"` (36px) / `size="large"` (52px, auth screens) |
| White button on a hero card | `<Button variant="contained" color="inverse">` |
| Outline button on a hero card | `<Button color="inverse">` |
| Text link button | `<Button variant="text">` or `<Link>` |
| Card | `<Card>`; hero card `variant="hero"`, dark card `variant="dark"`, amber border `variant="attention"` |
| Status pill | `<Pill tone="amber">` or `<Chip color="amber">` (soft variant by default) |
| Segmented tabs | `<ToggleButtonGroup exclusive>`; dark filter chips `ToggleButton color="nav"` |
| Callout | `<Alert severity="warning">` (amber) or `<Alert severity="info">` (accent) |
| Input with label above | `<TextField label="…">` (labels sit above the field) |
| Table | `TableContainer` + `Table`; numbers `align="right"` |
