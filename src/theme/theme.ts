"use client"

import { createTheme, type Theme } from "@mui/material/styles"
import type { Shadows } from "@mui/material/styles"
import NextLinkComposed from "./NextLinkComposed"
import {
    dark,
    iconSize,
    layout,
    light,
    radius,
    type SchemeTokens,
} from "./tokens"

/* ---------------------------------------------------------------------------
 * Palette
 * ------------------------------------------------------------------------- */

function palette(t: SchemeTokens) {
    return {
        primary: t.blue,
        secondary: t.teal,
        info: t.blue,
        success: t.green,
        // The design draws errors and warnings in amber.
        warning: t.amber,
        error: t.amber,
        blue: t.blue,
        teal: t.teal,
        amber: t.amber,
        purple: t.purple,
        neutral: t.neutral,
        nav: t.nav,
        inverse: t.inverse,
        background: t.background,
        text: t.text,
        divider: t.divider,
        border: t.border,
        track: t.track,
        shadowChannel: t.shadowInk,
        action: {
            hover: t.background.muted,
            selected: t.background.sunken,
            disabledBackground: t.text.disabled,
            disabled: t.text.disabled,
        },
    }
}

/* ---------------------------------------------------------------------------
 * Typography
 * ------------------------------------------------------------------------- */

const rem = (px: number) => `${px / 16}rem`
const FONT_BODY = 'var(--font-figtree), "Helvetica Neue", sans-serif'
const FONT_DISPLAY = 'var(--font-bricolage), "Helvetica Neue", sans-serif'
const FONT_MONO = 'ui-monospace, "SFMono-Regular", Menlo, monospace'

const display = (px: number, lineHeight: number, tracking?: string) => ({
    fontFamily: FONT_DISPLAY,
    fontSize: rem(px),
    fontWeight: 700,
    lineHeight,
    ...(tracking ? { letterSpacing: tracking } : {}),
})

const typography = {
    fontFamily: FONT_BODY,
    fontFamilyDisplay: FONT_DISPLAY,
    fontFamilyMono: FONT_MONO,
    fontSize: 14,
    htmlFontSize: 16,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,

    /** Large marketing title on the sign-in panel. */
    display: {
        fontFamily: FONT_DISPLAY,
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
        textWrap: "balance",
    },
    /** Page title. */
    h1: display(34, 1.15, "-0.02em"),
    /** Sign-in and two-factor card title. */
    h2: display(30, 1.15, "-0.02em"),
    /** Large section title. */
    h3: display(22, 1.25),
    /** Card title. */
    h4: display(20, 1.25),
    /** Small card title. */
    h5: display(18, 1.3),
    /** Emphasised list title in body font. */
    h6: {
        fontFamily: FONT_BODY,
        fontSize: rem(17),
        fontWeight: 600,
        lineHeight: 1.3,
    },
    /** Intro paragraph on auth screens. */
    subtitle1: { fontSize: rem(16), fontWeight: 400, lineHeight: 1.5 },
    /** Eyebrow line and small headings. */
    subtitle2: { fontSize: rem(14), fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: rem(15), fontWeight: 400, lineHeight: 1.4 },
    body2: { fontSize: rem(14), fontWeight: 400, lineHeight: 1.45 },
    caption: { fontSize: rem(13), fontWeight: 400, lineHeight: 1.4 },
    overline: {
        fontSize: rem(13),
        fontWeight: 700,
        lineHeight: 1.4,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
    },
    button: {
        fontSize: rem(15),
        fontWeight: 600,
        lineHeight: 1.2,
        textTransform: "none",
    },
    lead: { fontSize: rem(15), fontWeight: 400, lineHeight: 1.45 },
    label: { fontSize: rem(14), fontWeight: 600, lineHeight: 1.4 },
    stat: display(32, 1.1),
    micro: { fontSize: rem(12), fontWeight: 600, lineHeight: 1.3 },
    tiny: { fontSize: rem(11), fontWeight: 700, lineHeight: 1.2 },
    dateMonth: {
        fontSize: rem(10),
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
    },
    dateDay: display(18, 1),
    brand: display(17, 1.2),
    brandLg: display(19, 1.2),
    /** One-time code input. */
    code: display(28, 1.2, "0.3em"),
    codeLg: display(20, 1.2, "0.08em"),
    mono: {
        fontFamily: FONT_MONO,
        fontSize: rem(15),
        fontWeight: 400,
        lineHeight: 1.4,
        letterSpacing: "0.08em",
    },
} as const

/* ---------------------------------------------------------------------------
 * Shadows: tinted with the scheme's ink colour through a CSS variable.
 * ------------------------------------------------------------------------- */

const ink = (alpha: number) =>
    `rgb(var(--mui-palette-shadowChannel) / ${alpha})`

const shadows = [
    "none",
    `0 1px 3px ${ink(0.12)}`,
    `0 1px 2px ${ink(0.25)}`,
    `0 2px 6px ${ink(0.12)}`,
    `0 4px 10px ${ink(0.12)}`,
    ...Array.from({ length: 20 }, (_, i) => {
        const step = i + 5
        return `0 ${Math.round(step * 1.5)}px ${step * 4}px ${ink(0.12)}`
    }),
] as unknown as Shadows
// Menus and popovers (elevation 8) use the design's dropdown shadow.
shadows[8] = `0 12px 32px ${ink(0.12)}`

/* ---------------------------------------------------------------------------
 * Theme
 * ------------------------------------------------------------------------- */

const TONES = [
    "primary",
    "secondary",
    "blue",
    "teal",
    "amber",
    "purple",
    "neutral",
    "nav",
    "inverse",
    "success",
    "warning",
    "error",
    "info",
] as const

type Tone = (typeof TONES)[number]

/** Palette as CSS variables, so values follow the active colour scheme. */
const v = (theme: Theme) =>
    (theme.vars ?? theme) as NonNullable<Theme["vars"]>

export const theme = createTheme({
    cssVariables: { colorSchemeSelector: "class" },
    colorSchemes: {
        light: { palette: palette(light) },
        dark: { palette: palette(dark) },
    },
    typography,
    spacing: 8,
    shape: { borderRadius: radius.md },
    shadows,
    radius,
    iconSize,
    layout,
    components: {
        MuiCssBaseline: {
            styleOverrides: (t: Theme) => ({
                html: { WebkitFontSmoothing: "antialiased" },
                body: {
                    ...t.typography.body1,
                    maxWidth: "100vw",
                    overflowX: "hidden",
                    MozOsxFontSmoothing: "grayscale",
                },
                ":focus-visible": {
                    outline: `2px solid ${v(t).palette.primary.main}`,
                    outlineOffset: 2,
                },
                "a:not([class])": {
                    color: v(t).palette.primary.main,
                    textDecoration: "none",
                },
            }),
        },

        MuiTypography: {
            styleOverrides: {
                // Lets `color` take any palette path, e.g. "text.secondary" or "amber.dark".
                root: ({ theme, ownerState }) => {
                    const path = ownerState.color
                    if (typeof path !== "string" || !path.includes(".")) return {}
                    const value = path
                        .split(".")
                        .reduce<unknown>(
                            (node, key) =>
                                node && typeof node === "object"
                                    ? (node as Record<string, unknown>)[key]
                                    : undefined,
                            v(theme).palette,
                        )
                    return typeof value === "string" ? { color: value } : {}
                },
            },
        },

        MuiButtonBase: {
            defaultProps: {
                LinkComponent: NextLinkComposed,
                disableRipple: true,
            },
        },

        MuiLink: {
            defaultProps: {
                component: NextLinkComposed,
                underline: "none",
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    fontWeight: theme.typography.fontWeightSemiBold,
                    "&:hover": { color: v(theme).palette.primary.dark },
                }),
            },
        },

        MuiSvgIcon: {
            defaultProps: { fontSize: "medium" },
            styleOverrides: {
                root: {
                    variants: (
                        Object.keys(iconSize) as (keyof typeof iconSize)[]
                    ).map((size) => ({
                        props: { fontSize: size },
                        style: { fontSize: iconSize[size] },
                    })),
                },
            },
        },

        /* ---------- Surfaces ---------- */

        MuiPaper: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundImage: "none",
                    variants: [
                        {
                            props: { variant: "outlined" },
                            style: { borderColor: v(theme).palette.border.main },
                        },
                        {
                            props: { variant: "muted" },
                            style: {
                                backgroundColor:
                                    v(theme).palette.background.muted,
                                border: "none",
                            },
                        },
                        {
                            props: { variant: "hero" },
                            style: {
                                backgroundColor: v(theme).palette.primary.main,
                                color: v(theme).palette.primary.contrastText,
                                border: "none",
                            },
                        },
                        {
                            props: { variant: "dark" },
                            style: {
                                backgroundColor: v(theme).palette.nav.main,
                                color: v(theme).palette.nav.contrastText,
                                border: "none",
                            },
                        },
                        {
                            props: { variant: "attention" },
                            style: {
                                border: `1px solid ${v(theme).palette.amber.border}`,
                            },
                        },
                    ],
                }),
            },
        },

        MuiCard: {
            defaultProps: { variant: "outlined" },
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.radius.card,
                    padding: theme.spacing(2.5),
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.spacing(1.75),
                    minWidth: 0,
                    overflow: "visible",
                    color: v(theme).palette.text.primary,
                    "& > *": { minWidth: 0 },
                    "&[href]": {
                        transition: theme.transitions.create("border-color"),
                        "&:hover": {
                            borderColor: v(theme).palette.border.input,
                        },
                    },
                    variants: [
                        {
                            props: { variant: "hero" },
                            style: {
                                color: v(theme).palette.primary.contrastText,
                            },
                        },
                        {
                            props: { variant: "dark" },
                            style: { color: v(theme).palette.nav.contrastText },
                        },
                    ],
                }),
            },
        },

        MuiCardHeader: {
            styleOverrides: {
                root: { padding: 0 },
                title: ({ theme }) => theme.typography.h4,
            },
        },
        MuiCardContent: {
            styleOverrides: { root: { padding: 0, "&:last-child": { paddingBottom: 0 } } },
        },
        MuiCardActions: {
            styleOverrides: { root: ({ theme }) => ({ padding: 0, gap: theme.spacing(1) }) },
        },
        MuiCardActionArea: {
            styleOverrides: { root: ({ theme }) => ({ borderRadius: theme.radius.card }) },
        },

        MuiDivider: {
            styleOverrides: {
                root: ({ theme }) => ({ borderColor: v(theme).palette.divider }),
            },
        },

        MuiAppBar: {
            defaultProps: { elevation: 0, position: "static", color: "inherit" },
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: v(theme).palette.background.paper,
                    color: v(theme).palette.text.primary,
                    borderBottom: `1px solid ${v(theme).palette.border.main}`,
                }),
            },
        },

        MuiStack: {
            defaultProps: { useFlexGap: true },
        },

        /* ---------- Buttons ---------- */

        MuiButton: {
            defaultProps: {
                variant: "outlined",
                disableElevation: true,
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    minHeight: theme.layout.tapTarget,
                    padding: theme.spacing(0, 2),
                    borderRadius: theme.radius.md,
                    gap: theme.spacing(1),
                    whiteSpace: "nowrap",
                    transition: theme.transitions.create([
                        "background-color",
                        "border-color",
                        "color",
                    ]),
                    "&.Mui-disabled": { opacity: 0.55 },
                    variants: [
                        // Outlined is the design's plain white button.
                        {
                            props: { variant: "outlined" },
                            style: {
                                backgroundColor:
                                    v(theme).palette.background.paper,
                                borderColor: v(theme).palette.border.input,
                                color: v(theme).palette.text.primary,
                                "&:hover": {
                                    backgroundColor:
                                        v(theme).palette.background.paper,
                                    borderColor: v(theme).palette.border.strong,
                                },
                                "&.Mui-disabled": {
                                    borderColor: v(theme).palette.border.input,
                                    color: v(theme).palette.text.primary,
                                },
                            },
                        },
                        {
                            props: { variant: "outlined", color: "inverse" },
                            style: {
                                backgroundColor: "transparent",
                                borderColor: v(theme).palette.inverse.outline,
                                color: v(theme).palette.inverse.main,
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    borderColor: v(theme).palette.inverse.main,
                                },
                            },
                        },
                        {
                            props: { variant: "outlined", color: "nav" },
                            style: {
                                backgroundColor: "transparent",
                                borderColor: v(theme).palette.nav.badge,
                                color: v(theme).palette.nav.contrastText,
                                "&:hover": {
                                    backgroundColor: v(theme).palette.nav.hover,
                                    borderColor: v(theme).palette.nav.outline,
                                },
                            },
                        },
                        ...TONES.map((tone: Tone) => ({
                            props: { variant: "contained" as const, color: tone },
                            style: {
                                backgroundColor: v(theme).palette[tone].main,
                                color: v(theme).palette[tone].contrastText,
                                "&:hover": {
                                    backgroundColor: v(theme).palette[tone].dark,
                                    color: v(theme).palette[tone].contrastText,
                                },
                                "&.Mui-disabled": {
                                    backgroundColor:
                                        v(theme).palette.action.disabledBackground,
                                    color: v(theme).palette.primary.contrastText,
                                    opacity: 1,
                                },
                            },
                        })),
                        {
                            props: { variant: "text" },
                            style: {
                                minHeight: 0,
                                padding: theme.spacing(0.5, 0.75),
                                borderRadius: theme.radius.sm,
                                "&:hover": { backgroundColor: "transparent" },
                            },
                        },
                        {
                            props: { variant: "text", color: "primary" },
                            style: {
                                color: v(theme).palette.primary.main,
                                "&:hover": {
                                    color: v(theme).palette.primary.dark,
                                },
                            },
                        },
                        {
                            props: { size: "small" },
                            style: {
                                minHeight: theme.layout.control.sm,
                                padding: theme.spacing(0, 1.5),
                                borderRadius: theme.radius.sm,
                                fontSize: theme.typography.body2.fontSize,
                            },
                        },
                        {
                            props: { size: "large" },
                            style: {
                                minHeight: theme.layout.control.xl,
                                padding: theme.spacing(0, 3.5),
                                borderRadius: theme.radius.lg,
                                fontSize: theme.typography.h6.fontSize,
                            },
                        },
                        {
                            props: { size: "large", variant: "outlined" },
                            style: {
                                minHeight: theme.layout.control.lg,
                                fontSize: theme.typography.body1.fontSize,
                            },
                        },
                        {
                            props: { variant: "text", size: "small" },
                            style: { minHeight: 0, padding: theme.spacing(0.5, 0.75) },
                        },
                    ],
                }),
                startIcon: { marginLeft: 0, marginRight: 0 },
                endIcon: { marginLeft: 0, marginRight: 0 },
            },
        },

        MuiIconButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    width: theme.layout.tapTarget,
                    height: theme.layout.tapTarget,
                    borderRadius: theme.radius.sm,
                    border: `1px solid ${v(theme).palette.border.input}`,
                    color: v(theme).palette.text.primary,
                    backgroundColor: v(theme).palette.background.paper,
                    "&:hover": {
                        backgroundColor: v(theme).palette.background.paper,
                        borderColor: v(theme).palette.border.strong,
                    },
                    variants: [
                        {
                            props: { size: "small" },
                            style: {
                                width: theme.layout.control.sm,
                                height: theme.layout.control.sm,
                            },
                        },
                        {
                            props: { color: "nav" },
                            style: {
                                backgroundColor: "transparent",
                                borderColor: v(theme).palette.nav.badge,
                                color: v(theme).palette.nav.contrastText,
                                "&:hover": {
                                    backgroundColor: v(theme).palette.nav.hover,
                                    borderColor: v(theme).palette.nav.outline,
                                },
                            },
                        },
                        {
                            props: { color: "inherit" },
                            style: {
                                border: "none",
                                backgroundColor: "transparent",
                                color: "inherit",
                                "&:hover": { backgroundColor: v(theme).palette.action.hover },
                            },
                        },
                    ],
                }),
            },
        },

        MuiToggleButtonGroup: {
            styleOverrides: {
                root: ({ theme }) => ({
                    display: "inline-flex",
                    flexWrap: "wrap",
                    gap: theme.spacing(0.5),
                    padding: theme.spacing(0.5),
                    borderRadius: theme.radius.md,
                    backgroundColor: v(theme).palette.neutral.soft,
                    variants: [
                        { props: { fullWidth: true }, style: { display: "flex", flexWrap: "nowrap" } },
                        {
                            props: { color: "nav" },
                            style: {
                                backgroundColor: v(theme).palette.nav.active,
                                "& .MuiToggleButton-root": {
                                    color: v(theme).palette.nav.text,
                                    "&:hover": { color: v(theme).palette.nav.contrastText },
                                    "&.Mui-selected, &.Mui-selected:hover": {
                                        backgroundColor: v(theme).palette.nav.badge,
                                        color: v(theme).palette.nav.contrastText,
                                        boxShadow: "none",
                                    },
                                },
                            },
                        },
                    ],
                }),
                grouped: ({ theme }) => ({
                    border: "none",
                    margin: 0,
                    borderRadius: `${theme.radius.sm}px !important`,
                }),
            },
        },

        MuiToggleButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.label,
                    minHeight: theme.layout.control.sm,
                    padding: theme.spacing(0, 1.75),
                    gap: theme.spacing(0.75),
                    border: "none",
                    borderRadius: theme.radius.sm,
                    textTransform: "none",
                    color: v(theme).palette.text.secondary,
                    backgroundColor: "transparent",
                    "&:hover": {
                        backgroundColor: "transparent",
                        color: v(theme).palette.text.primary,
                    },
                    "&.Mui-selected, &.Mui-selected:hover": {
                        backgroundColor: v(theme).palette.background.paper,
                        color: v(theme).palette.text.primary,
                        boxShadow: theme.shadows[1],
                    },
                    variants: [
                        {
                            props: { color: "nav" },
                            style: {
                                "&.Mui-selected, &.Mui-selected:hover": {
                                    backgroundColor: v(theme).palette.nav.main,
                                    color: v(theme).palette.nav.contrastText,
                                    boxShadow: "none",
                                },
                            },
                        },
                    ],
                }),
            },
        },

        /* ---------- Chips, badges, avatars ---------- */

        MuiChip: {
            defaultProps: { variant: "soft", color: "neutral", size: "small" },
            styleOverrides: {
                root: ({ theme }) => ({
                    height: "auto",
                    borderRadius: theme.radius.pill,
                    gap: theme.spacing(0.75),
                    maxWidth: "100%",
                    variants: [
                        {
                            props: { size: "small" },
                            style: {
                                ...theme.typography.micro,
                                padding: theme.spacing(0.375, 1.125),
                            },
                        },
                        {
                            props: { size: "medium" },
                            style: {
                                fontSize: theme.typography.caption.fontSize,
                                fontWeight: theme.typography.fontWeightSemiBold,
                                padding: theme.spacing(0.625, 1.25),
                            },
                        },
                        ...TONES.map((tone: Tone) => ({
                            props: { variant: "soft" as const, color: tone },
                            style: {
                                backgroundColor: v(theme).palette[tone].soft,
                                color: v(theme).palette[tone].softContrast,
                            },
                        })),
                        {
                            props: { variant: "filled", color: "nav" },
                            style: { backgroundColor: v(theme).palette.nav.badge },
                        },
                    ],
                }),
                label: { padding: 0, overflow: "visible" },
                icon: { margin: 0, color: "inherit" },
                deleteIcon: { margin: 0, color: "inherit" },
            },
        },

        MuiBadge: {
            styleOverrides: {
                badge: ({ theme }) => ({
                    ...theme.typography.tiny,
                    minWidth: theme.layout.badge,
                    height: theme.layout.badge,
                    padding: theme.spacing(0, 0.625),
                    borderRadius: theme.radius.pill,
                }),
            },
        },

        MuiAvatar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    width: theme.layout.avatar,
                    height: theme.layout.avatar,
                    fontSize: theme.typography.body2.fontSize,
                    fontWeight: theme.typography.fontWeightBold,
                    backgroundColor: v(theme).palette.nav.main,
                    color: v(theme).palette.nav.contrastText,
                    variants: [
                        {
                            props: { variant: "soft" },
                            style: {
                                borderRadius: "50%",
                                backgroundColor: v(theme).palette.primary.soft,
                                color: v(theme).palette.primary.softContrast,
                            },
                        },
                    ],
                }),
            },
        },

        MuiLinearProgress: {
            defaultProps: { variant: "determinate" },
            styleOverrides: {
                root: ({ theme }) => ({
                    height: theme.layout.progress,
                    borderRadius: theme.radius.xs / 2,
                    backgroundColor: v(theme).palette.track,
                }),
                bar: ({ theme }) => ({
                    borderRadius: theme.radius.xs / 2,
                    backgroundColor: v(theme).palette.primary.main,
                }),
            },
        },

        /* ---------- Feedback ---------- */

        MuiAlert: {
            defaultProps: { icon: false, severity: "info" },
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.body2,
                    padding: theme.spacing(1.75, 2),
                    gap: theme.spacing(1.25),
                    borderRadius: theme.radius.md,
                    border: "1px solid transparent",
                    alignItems: "flex-start",
                    variants: [
                        {
                            props: { severity: "info" },
                            style: {
                                backgroundColor: v(theme).palette.primary.soft,
                                color: v(theme).palette.primary.softContrast,
                            },
                        },
                        {
                            props: { severity: "warning" },
                            style: {
                                backgroundColor: v(theme).palette.amber.wash,
                                borderColor: v(theme).palette.amber.border,
                                color: v(theme).palette.amber.dark,
                            },
                        },
                        {
                            props: { severity: "error" },
                            style: {
                                backgroundColor: v(theme).palette.amber.wash,
                                borderColor: v(theme).palette.amber.border,
                                color: v(theme).palette.amber.alertText,
                                "& .MuiAlert-icon": {
                                    color: v(theme).palette.amber.dark,
                                },
                            },
                        },
                        {
                            props: { severity: "success" },
                            style: {
                                backgroundColor: v(theme).palette.success.soft,
                                color: v(theme).palette.success.softContrast,
                            },
                        },
                        {
                            props: { color: "neutral" },
                            style: {
                                backgroundColor:
                                    v(theme).palette.background.default,
                                borderColor: "transparent",
                                color: v(theme).palette.text.secondary,
                            },
                        },
                    ],
                }),
                icon: { padding: 0, marginRight: 0, opacity: 1, fontSize: iconSize.small },
                message: { padding: 0, overflow: "visible", minWidth: 0 },
                action: { padding: 0, marginRight: 0 },
            },
        },

        MuiAlertTitle: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.label,
                    marginTop: 0,
                    marginBottom: theme.spacing(0.25),
                }),
            },
        },

        MuiSnackbarContent: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.body2,
                    borderRadius: theme.radius.md,
                    backgroundColor: v(theme).palette.nav.main,
                    color: v(theme).palette.nav.contrastText,
                }),
            },
        },

        MuiTooltip: {
            styleOverrides: {
                tooltip: ({ theme }) => ({
                    ...theme.typography.caption,
                    padding: theme.spacing(0.75, 1.25),
                    borderRadius: theme.radius.xs,
                    backgroundColor: v(theme).palette.nav.main,
                    color: v(theme).palette.nav.contrastText,
                }),
                arrow: ({ theme }) => ({ color: v(theme).palette.nav.main }),
            },
        },

        MuiSkeleton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: v(theme).palette.track,
                    borderRadius: theme.radius.xs,
                }),
            },
        },

        /* ---------- Menus, popovers, dialogs ---------- */

        MuiPopover: {
            styleOverrides: {
                paper: ({ theme }) => ({
                    marginTop: theme.spacing(1),
                    borderRadius: theme.radius.md,
                    border: `1px solid ${v(theme).palette.border.main}`,
                    boxShadow: theme.shadows[8],
                }),
            },
        },

        MuiMenu: {
            styleOverrides: {
                paper: ({ theme }) => ({ minWidth: theme.layout.menuWidth }),
                list: ({ theme }) => ({ padding: theme.spacing(0.75) }),
            },
        },

        MuiMenuItem: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.body2,
                    fontWeight: theme.typography.fontWeightMedium,
                    minHeight: theme.layout.menuItem,
                    gap: theme.spacing(1),
                    padding: theme.spacing(0, 1.25),
                    borderRadius: theme.radius.xs,
                    "&:hover": {
                        backgroundColor: v(theme).palette.background.muted,
                    },
                    "&.Mui-selected": {
                        backgroundColor: v(theme).palette.background.sunken,
                    },
                }),
            },
        },

        MuiListSubheader: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.overline,
                    lineHeight: 2.5,
                    backgroundColor: "transparent",
                    color: v(theme).palette.text.secondary,
                }),
            },
        },

        MuiListItemIcon: {
            styleOverrides: { root: { minWidth: 0, color: "inherit" } },
        },

        MuiListItemText: {
            styleOverrides: {
                root: { margin: 0 },
                primary: ({ theme }) => ({
                    fontWeight: theme.typography.fontWeightSemiBold,
                }),
                secondary: ({ theme }) => ({
                    ...theme.typography.caption,
                    color: v(theme).palette.text.secondary,
                }),
            },
        },

        MuiListItemButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    gap: theme.spacing(1.5),
                    "&:hover": {
                        backgroundColor: v(theme).palette.background.muted,
                    },
                }),
            },
        },

        MuiDialog: {
            styleOverrides: {
                paper: ({ theme }) => ({
                    borderRadius: theme.radius.panel,
                    border: `1px solid ${v(theme).palette.border.main}`,
                    padding: theme.spacing(1),
                }),
            },
        },
        MuiDialogTitle: {
            styleOverrides: { root: ({ theme }) => theme.typography.h4 },
        },
        MuiDialogActions: {
            styleOverrides: { root: ({ theme }) => ({ gap: theme.spacing(1), padding: theme.spacing(2, 3) }) },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgb(var(--mui-palette-shadowChannel) / 0.45)",
                    variants: [
                        { props: { invisible: true }, style: { backgroundColor: "transparent" } },
                    ],
                },
            },
        },

        MuiDrawer: {
            styleOverrides: {
                paper: ({ theme }) => ({
                    backgroundColor: v(theme).palette.nav.main,
                    color: v(theme).palette.nav.contrastText,
                    border: "none",
                }),
            },
        },

        MuiAccordion: {
            defaultProps: { disableGutters: true, elevation: 0 },
            styleOverrides: {
                root: ({ theme }) => ({
                    border: `1px solid ${v(theme).palette.border.main}`,
                    borderRadius: theme.radius.md,
                    "&::before": { display: "none" },
                }),
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: ({ theme }) => ({ ...theme.typography.label, minHeight: theme.layout.tapTarget }),
            },
        },

        MuiTabs: {
            styleOverrides: {
                root: ({ theme }) => ({ minHeight: theme.layout.tapTarget }),
                indicator: ({ theme }) => ({
                    height: theme.layout.tabIndicator,
                    backgroundColor: v(theme).palette.primary.main,
                }),
                scrollButtons: { "&.Mui-disabled": { opacity: 0.3 } },
            },
        },

        MuiTab: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.body1,
                    fontWeight: theme.typography.fontWeightSemiBold,
                    minHeight: theme.layout.tapTarget,
                    minWidth: 0,
                    padding: theme.spacing(0, 1.5),
                    gap: theme.spacing(0.75),
                    textTransform: "none",
                    color: v(theme).palette.text.secondary,
                    "&:hover": { color: v(theme).palette.text.primary },
                    "&.Mui-selected": {
                        color: v(theme).palette.text.primary,
                        fontWeight: theme.typography.fontWeightBold,
                    },
                }),
            },
        },

        MuiBreadcrumbs: {
            styleOverrides: {
                root: ({ theme }) => ({ ...theme.typography.body2, color: v(theme).palette.text.secondary }),
            },
        },

        MuiPaginationItem: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.label,
                    borderRadius: theme.radius.sm,
                    "&.Mui-selected": {
                        backgroundColor: v(theme).palette.primary.main,
                        color: v(theme).palette.primary.contrastText,
                    },
                }),
            },
        },

        /* ---------- Forms ---------- */

        MuiFormControl: {
            defaultProps: { size: "small" },
        },

        MuiTextField: {
            defaultProps: { size: "small", fullWidth: true },
        },

        MuiSelect: {
            defaultProps: { size: "small" },
        },

        MuiInputLabel: {
            defaultProps: { shrink: true, disableAnimation: true },
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.label,
                    position: "static",
                    transform: "none",
                    maxWidth: "100%",
                    marginBottom: theme.spacing(0.75),
                    color: v(theme).palette.text.primary,
                    "&.Mui-focused": { color: v(theme).palette.text.primary },
                    "&.Mui-error": { color: v(theme).palette.text.primary },
                    "&.Mui-disabled": { color: v(theme).palette.text.secondary },
                }),
                asterisk: ({ theme }) => ({ color: v(theme).palette.amber.dark }),
            },
        },

        MuiFormLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.label,
                    color: v(theme).palette.text.primary,
                    "&.Mui-focused": { color: v(theme).palette.text.primary },
                }),
            },
        },

        MuiFormHelperText: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.caption,
                    margin: theme.spacing(0.75, 0, 0),
                    color: v(theme).palette.text.secondary,
                    "&.Mui-error": { color: v(theme).palette.amber.dark },
                }),
            },
        },

        MuiOutlinedInput: {
            defaultProps: { notched: false },
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.body1,
                    minHeight: theme.layout.tapTarget,
                    borderRadius: theme.radius.sm,
                    backgroundColor: v(theme).palette.background.paper,
                    color: v(theme).palette.text.primary,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: v(theme).palette.border.strong,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: v(theme).palette.primary.main,
                        borderWidth: 2,
                    },
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                        borderColor: v(theme).palette.amber.main,
                        borderWidth: 2,
                    },
                    variants: [
                        {
                            props: { size: "medium" },
                            style: {
                                minHeight: theme.layout.control.lg,
                                borderRadius: theme.radius.md,
                                fontSize: theme.typography.subtitle1.fontSize,
                            },
                        },
                        {
                            props: { multiline: true },
                            style: { padding: theme.spacing(1.25, 1.5) },
                        },
                    ],
                }),
                input: ({ theme }) => ({
                    padding: theme.spacing(1.25, 1.5),
                    "&::placeholder": {
                        color: v(theme).palette.text.faint,
                        opacity: 1,
                    },
                    variants: [
                        {
                            props: { size: "medium" },
                            style: { padding: theme.spacing(1.5, 1.75) },
                        },
                        {
                            props: { multiline: true },
                            style: { padding: 0 },
                        },
                    ],
                }),
                notchedOutline: ({ theme }) => ({
                    borderColor: v(theme).palette.border.input,
                    "& legend": { display: "none" },
                    top: 0,
                }),
                adornedStart: ({ theme }) => ({ paddingLeft: theme.spacing(1.5) }),
                adornedEnd: ({ theme }) => ({ paddingRight: theme.spacing(0.5) }),
            },
        },

        MuiInputAdornment: {
            styleOverrides: {
                root: ({ theme }) => ({ color: v(theme).palette.text.secondary }),
            },
        },

        MuiCheckbox: {
            defaultProps: { size: "small" },
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: theme.spacing(0.75),
                    color: v(theme).palette.border.input,
                    "&.Mui-checked, &.MuiCheckbox-indeterminate": {
                        color: v(theme).palette.primary.main,
                    },
                }),
            },
        },

        MuiRadio: {
            defaultProps: { size: "small" },
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: theme.spacing(0.75),
                    color: v(theme).palette.border.input,
                    "&.Mui-checked": { color: v(theme).palette.primary.main },
                }),
            },
        },

        MuiFormControlLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    minHeight: theme.layout.tapTarget,
                    marginLeft: theme.spacing(-0.75),
                    marginRight: 0,
                    gap: theme.spacing(0.5),
                }),
                label: ({ theme }) => theme.typography.body2,
            },
        },

        MuiSwitch: {
            styleOverrides: {
                root: ({ theme }) => ({
                    width: theme.layout.switch.width,
                    height: theme.layout.switch.height,
                    padding: 0,
                    flex: "0 0 auto",
                    overflow: "visible",
                    "& .MuiSwitch-switchBase": {
                        padding: theme.spacing(0.375),
                        "&.Mui-checked": {
                            transform: `translateX(${theme.layout.switch.width - theme.layout.switch.height}px)`,
                            color: v(theme).palette.inverse.main,
                            "& + .MuiSwitch-track": {
                                backgroundColor: v(theme).palette.primary.main,
                                opacity: 1,
                            },
                        },
                        "&:hover": { backgroundColor: "transparent" },
                    },
                    variants: TONES.map((tone: Tone) => ({
                        props: { color: tone },
                        style: {
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                { backgroundColor: v(theme).palette[tone].main },
                        },
                    })),
                }),
                thumb: ({ theme }) => ({
                    width: theme.layout.switch.thumb,
                    height: theme.layout.switch.thumb,
                    boxShadow: theme.shadows[2],
                    color: v(theme).palette.inverse.main,
                }),
                track: ({ theme }) => ({
                    borderRadius: theme.radius.pill,
                    backgroundColor: v(theme).palette.border.dashed,
                    opacity: 1,
                }),
            },
        },

        MuiSlider: {
            styleOverrides: {
                rail: ({ theme }) => ({ backgroundColor: v(theme).palette.track, opacity: 1 }),
            },
        },

        /* ---------- Tables ---------- */

        MuiTableContainer: {
            styleOverrides: { root: { position: "relative", overflowX: "auto" } },
        },

        MuiTable: {
            styleOverrides: { root: { borderCollapse: "collapse" } },
        },

        MuiTableCell: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.typography.body2,
                    padding: theme.spacing(1.5),
                    borderBottom: `1px solid ${v(theme).palette.divider}`,
                    verticalAlign: "middle",
                    color: "inherit",
                    "&:first-of-type": { paddingLeft: 0 },
                    "&:last-of-type": { paddingRight: 0 },
                    variants: [
                        {
                            props: { align: "right" },
                            style: { fontVariantNumeric: "tabular-nums" },
                        },
                    ],
                }),
                head: ({ theme }) => ({
                    fontWeight: theme.typography.fontWeightSemiBold,
                    color: v(theme).palette.text.secondary,
                    padding: theme.spacing(1, 1.5, 1.25),
                    whiteSpace: "nowrap",
                }),
            },
        },

        MuiTableBody: {
            styleOverrides: {
                root: {
                    "& .MuiTableRow-root:last-of-type .MuiTableCell-root": {
                        borderBottom: "none",
                    },
                },
            },
        },

        MuiTableRow: {
            styleOverrides: {
                root: ({ theme }) => ({
                    "&.MuiTableRow-hover:hover": {
                        backgroundColor: v(theme).palette.background.muted,
                    },
                    "&.Mui-selected, &.Mui-selected:hover": {
                        backgroundColor: v(theme).palette.background.sunken,
                    },
                }),
            },
        },
    },
})

export default theme
