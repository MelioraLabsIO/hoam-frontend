/*
 * HOAM design tokens.
 *
 * Every colour, size and radius the app uses lives here. The MUI theme in
 * ./theme.ts is built from these values, and components read them only through
 * the theme (palette keys, typography variants, spacing units, shape radii).
 */

/** One colour role: solid fill, its hover shade, and the soft pill/tile pair. */
export type ToneTokens = {
    main: string
    dark: string
    light: string
    contrastText: string
    soft: string
    softContrast: string
}

export type SchemeTokens = {
    background: { default: string; paper: string; muted: string; sunken: string }
    text: { primary: string; secondary: string; faint: string; disabled: string }
    border: { main: string; input: string; strong: string; dashed: string }
    divider: string
    track: string
    shadowInk: string
    /** Accent for the owner and manager portals. */
    blue: ToneTokens
    /** Accent for the tenant portal. */
    teal: ToneTokens
    amber: ToneTokens & { border: string; wash: string; alertText: string }
    purple: ToneTokens
    neutral: ToneTokens
    green: ToneTokens
    red: ToneTokens
    /** The dark sidebar and sign-in panel. */
    nav: {
        main: string
        dark: string
        light: string
        contrastText: string
        soft: string
        softContrast: string
        text: string
        sub: string
        active: string
        badge: string
        hover: string
        outline: string
    }
    /** White button and outline on a coloured hero card. */
    inverse: {
        main: string
        dark: string
        light: string
        contrastText: string
        soft: string
        softContrast: string
        outline: string
    }
}

export const light: SchemeTokens = {
    background: {
        default: "#f3f5f9",
        paper: "#ffffff",
        muted: "#f3f5f9",
        sunken: "#edf2fa",
    },
    text: {
        primary: "#141c2b",
        secondary: "#4e5a6b",
        faint: "#6a7586",
        disabled: "#9aa6b8",
    },
    border: {
        main: "#d9e0ea",
        input: "#c5cfdc",
        strong: "#4e5a6b",
        dashed: "#b6c1cf",
    },
    divider: "#e6ebf2",
    track: "#e2e8f0",
    shadowInk: "20 28 43",
    blue: {
        main: "#1d4e89",
        dark: "#163c6b",
        light: "#e1ebf7",
        contrastText: "#ffffff",
        soft: "#e1ebf7",
        softContrast: "#163c6b",
    },
    teal: {
        main: "#0f6a73",
        dark: "#0a3f43",
        light: "#d6eeee",
        contrastText: "#ffffff",
        soft: "#d6eeee",
        softContrast: "#0e5459",
    },
    amber: {
        main: "#b45f06",
        dark: "#7a3e00",
        light: "#fce9cf",
        contrastText: "#ffffff",
        soft: "#fce9cf",
        softContrast: "#7a3e00",
        border: "#e9c89a",
        wash: "#fdf4e7",
        alertText: "#5c3a10",
    },
    purple: {
        main: "#5a2d73",
        dark: "#43205a",
        light: "#efe4f5",
        contrastText: "#ffffff",
        soft: "#efe4f5",
        softContrast: "#5a2d73",
    },
    neutral: {
        main: "#3a4556",
        dark: "#262f3d",
        light: "#edf0f5",
        contrastText: "#ffffff",
        soft: "#edf0f5",
        softContrast: "#3a4556",
    },
    green: {
        main: "#1f7a4d",
        dark: "#155a38",
        light: "#dcf1e5",
        contrastText: "#ffffff",
        soft: "#dcf1e5",
        softContrast: "#155a38",
    },
    red: {
        main: "#b42318",
        dark: "#8a1a12",
        light: "#fbe3e1",
        contrastText: "#ffffff",
        soft: "#fbe3e1",
        softContrast: "#8a1a12",
    },
    nav: {
        main: "#141c2b",
        dark: "#0b1018",
        light: "#26324a",
        contrastText: "#ffffff",
        soft: "#26324a",
        softContrast: "#e5eaf2",
        text: "#c6cfdd",
        sub: "#a7b2c4",
        active: "#26324a",
        badge: "#34425e",
        hover: "rgba(255, 255, 255, 0.06)",
        outline: "rgba(255, 255, 255, 0.45)",
    },
    inverse: {
        main: "#ffffff",
        dark: "#eef2f7",
        light: "#ffffff",
        contrastText: "#141c2b",
        soft: "rgba(255, 255, 255, 0.14)",
        softContrast: "#ffffff",
        outline: "rgba(255, 255, 255, 0.45)",
    },
}

export const dark: SchemeTokens = {
    background: {
        default: "#0e131c",
        paper: "#161d29",
        muted: "#1b2330",
        sunken: "#1f2938",
    },
    text: {
        primary: "#e8edf5",
        secondary: "#a6b1c2",
        faint: "#8591a3",
        disabled: "#5c6779",
    },
    border: {
        main: "#2a3445",
        input: "#3a4558",
        strong: "#a6b1c2",
        dashed: "#4a566a",
    },
    divider: "#232c3a",
    track: "#2a3445",
    shadowInk: "0 0 0",
    blue: {
        main: "#6ea6ea",
        dark: "#8fbaf0",
        light: "#1b2d45",
        contrastText: "#0b1422",
        soft: "#1b2d45",
        softContrast: "#b9d3f3",
    },
    teal: {
        main: "#4fb8c0",
        dark: "#73cbd1",
        light: "#133638",
        contrastText: "#061a1c",
        soft: "#133638",
        softContrast: "#9fdde0",
    },
    amber: {
        main: "#e0902e",
        dark: "#f3c27e",
        light: "#3a2810",
        contrastText: "#1a1004",
        soft: "#3a2810",
        softContrast: "#f3c27e",
        border: "#6b4a1e",
        wash: "#2a1f10",
        alertText: "#f6d3a3",
    },
    purple: {
        main: "#c79be0",
        dark: "#d8b8ea",
        light: "#2f2238",
        contrastText: "#1a0f20",
        soft: "#2f2238",
        softContrast: "#d8b8ea",
    },
    neutral: {
        main: "#c3ccd9",
        dark: "#dde3ec",
        light: "#252e3b",
        contrastText: "#0e131c",
        soft: "#252e3b",
        softContrast: "#c3ccd9",
    },
    green: {
        main: "#5cc68f",
        dark: "#86d8ad",
        light: "#14301f",
        contrastText: "#06180e",
        soft: "#14301f",
        softContrast: "#a4e2c0",
    },
    red: {
        main: "#f07a6f",
        dark: "#f59f97",
        light: "#3a1714",
        contrastText: "#1f0907",
        soft: "#3a1714",
        softContrast: "#f8b8b2",
    },
    nav: {
        main: "#0a0f17",
        dark: "#06090f",
        light: "#1f2a3d",
        contrastText: "#ffffff",
        soft: "#1f2a3d",
        softContrast: "#e5eaf2",
        text: "#c6cfdd",
        sub: "#a7b2c4",
        active: "#1f2a3d",
        badge: "#34425e",
        hover: "rgba(255, 255, 255, 0.06)",
        outline: "rgba(255, 255, 255, 0.45)",
    },
    inverse: {
        main: "#ffffff",
        dark: "#e5eaf2",
        light: "#ffffff",
        contrastText: "#141c2b",
        soft: "rgba(255, 255, 255, 0.14)",
        softContrast: "#ffffff",
        outline: "rgba(255, 255, 255, 0.45)",
    },
}

/** Corner radii in px. */
export const radius = {
    xs: 8,
    sm: 10,
    md: 12,
    lg: 14,
    xl: 16,
    /** Cards. */
    card: 18,
    /** Auth card and dialogs. */
    panel: 22,
    pill: 999,
} as const

/** Icon sizes in px, used by the SvgIcon `fontSize` prop. */
export const iconSize = {
    xsmall: 16,
    small: 18,
    medium: 20,
    large: 28,
    xlarge: 40,
} as const

/** Fixed layout measures in px. */
export const layout = {
    sidebarWidth: 240,
    contentMaxWidth: 1200,
    gutter: "clamp(16px, 3vw, 40px)",
    authPagePadding: "clamp(24px, 5vw, 56px)",
    authCardPadding: "clamp(24px, 4vw, 40px)",
    authCard: { sm: 460, md: 560, lg: 720 },
    /** Controls are at least this tall so they are easy to tap. */
    tapTarget: 44,
    /** Content area collapses the sidebar under this width. */
    navBreakpoint: 900,
    /** Smallest column width for each auto-fit grid. */
    grid: { stats: 220, cards: 300, wide: 460, methods: 240, codes: 210 },
    /** Main column + side column that wraps under on narrow screens. */
    split: { main: 520, side: 300 },
    /** Control heights. */
    control: { sm: 36, md: 44, lg: 48, xl: 52, code: 60 },
    avatar: 40,
    badge: 18,
    menuItem: 40,
    progress: 8,
    tabIndicator: 3,
    switch: { width: 52, height: 32, thumb: 26 },
    brandMark: { md: 36, lg: 40 },
    dateTile: { width: 46, height: 50 },
    iconTile: 56,
    qr: 168,
    menuWidth: 220,
} as const
