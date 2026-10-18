/**
 * Re-points the theme's primary colour at another palette role for one part of
 * the page. The tenant portal uses this to swap the blue accent for teal, so
 * every component that reads `primary` (buttons, tabs, hero cards, date tiles)
 * follows without its own colour. Works in light and dark because both sides
 * are theme CSS variables.
 */
export function accentScope(role: "teal" | "blue"): Record<string, string> {
    const prefix = "--mui-palette"
    const keys = [
        "main",
        "dark",
        "light",
        "contrastText",
        "soft",
        "softContrast",
        "mainChannel",
        "darkChannel",
        "lightChannel",
        "contrastTextChannel",
    ]
    return Object.fromEntries(
        keys.map((k) => [`${prefix}-primary-${k}`, `var(${prefix}-${role}-${k})`]),
    )
}
