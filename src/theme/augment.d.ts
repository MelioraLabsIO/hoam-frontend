/*
 * Type additions for the HOAM theme: extra palette roles, typography variants,
 * shape radii, layout measures and the component variants they enable.
 */
import type { CSSProperties } from "react"
import type { iconSize, layout, radius } from "./tokens"

type ExtraTypography =
    | "display"
    | "lead"
    | "label"
    | "stat"
    | "micro"
    | "tiny"
    | "dateMonth"
    | "dateDay"
    | "brand"
    | "brandLg"
    | "code"
    | "codeLg"
    | "mono"

declare module "@mui/material/styles" {
    interface PaletteColor {
        soft: string
        softContrast: string
    }
    interface SimplePaletteColorOptions {
        soft?: string
        softContrast?: string
    }

    interface NavPaletteColor extends PaletteColor {
        text: string
        sub: string
        active: string
        badge: string
        hover: string
        outline: string
    }
    interface InversePaletteColor extends PaletteColor {
        outline: string
    }
    interface AmberPaletteColor extends PaletteColor {
        border: string
        wash: string
        alertText: string
    }

    interface Palette {
        blue: PaletteColor
        teal: PaletteColor
        amber: AmberPaletteColor
        purple: PaletteColor
        neutral: PaletteColor
        nav: NavPaletteColor
        inverse: InversePaletteColor
        border: { main: string; input: string; strong: string; dashed: string }
        track: string
        shadowChannel: string
    }
    interface PaletteOptions {
        blue?: SimplePaletteColorOptions
        teal?: SimplePaletteColorOptions
        amber?: SimplePaletteColorOptions & {
            border: string
            wash: string
            alertText: string
        }
        purple?: SimplePaletteColorOptions
        neutral?: SimplePaletteColorOptions
        nav?: SimplePaletteColorOptions & {
            text: string
            sub: string
            active: string
            badge: string
            hover: string
            outline: string
        }
        inverse?: SimplePaletteColorOptions & { outline: string }
        border?: { main: string; input: string; strong: string; dashed: string }
        track?: string
        shadowChannel?: string
    }
    interface TypeBackground {
        muted: string
        sunken: string
    }
    interface TypeText {
        faint: string
    }

    interface TypographyVariants extends Record<ExtraTypography, CSSProperties> {
        fontFamilyDisplay: string
        fontFamilyMono: string
        fontWeightSemiBold: number
    }
    interface TypographyVariantsOptions
        extends Partial<Record<ExtraTypography, CSSProperties>> {
        fontFamilyDisplay?: string
        fontFamilyMono?: string
        fontWeightSemiBold?: number
    }

    interface Theme {
        radius: typeof radius
        iconSize: typeof iconSize
        layout: typeof layout
    }
    interface ThemeOptions {
        radius?: typeof radius
        iconSize?: typeof iconSize
        layout?: typeof layout
    }
    interface CssVarsThemeOptions {
        radius?: typeof radius
        iconSize?: typeof iconSize
        layout?: typeof layout
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        display: true
        lead: true
        label: true
        stat: true
        micro: true
        tiny: true
        dateMonth: true
        dateDay: true
        brand: true
        brandLg: true
        code: true
        codeLg: true
        mono: true
    }
}


declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        neutral: true
        blue: true
        teal: true
        amber: true
        purple: true
        nav: true
        inverse: true
    }
}
declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
        neutral: true
        blue: true
        teal: true
        amber: true
        purple: true
        nav: true
        inverse: true
    }
}
declare module "@mui/material/Chip" {
    interface ChipPropsColorOverrides {
        neutral: true
        blue: true
        teal: true
        amber: true
        purple: true
        nav: true
        inverse: true
    }
    interface ChipPropsVariantOverrides {
        soft: true
    }
}
declare module "@mui/material/Switch" {
    interface SwitchPropsColorOverrides {
        neutral: true
        blue: true
        teal: true
        amber: true
        purple: true
        nav: true
        inverse: true
    }
}
declare module "@mui/material/Badge" {
    interface BadgePropsColorOverrides {
        neutral: true
        blue: true
        teal: true
        amber: true
        purple: true
        nav: true
        inverse: true
    }
}
declare module "@mui/material/ToggleButton" {
    interface ToggleButtonPropsColorOverrides {
        neutral: true
        blue: true
        teal: true
        amber: true
        purple: true
        nav: true
        inverse: true
    }
}
declare module "@mui/material/ToggleButtonGroup" {
    interface ToggleButtonGroupPropsColorOverrides {
        neutral: true
        blue: true
        teal: true
        amber: true
        purple: true
        nav: true
        inverse: true
    }
}
declare module "@mui/material/LinearProgress" {
    interface LinearProgressPropsColorOverrides {
        neutral: true
        blue: true
        teal: true
        amber: true
        purple: true
        nav: true
        inverse: true
    }
}
declare module "@mui/material/Avatar" {
    interface AvatarPropsVariantOverrides {
        soft: true
    }
}
declare module "@mui/material/Paper" {
    interface PaperPropsVariantOverrides {
        hero: true
        dark: true
        attention: true
        muted: true
    }
}
declare module "@mui/material/Alert" {
    interface AlertPropsColorOverrides {
        neutral: true
    }
}
declare module "@mui/material/SvgIcon" {
    interface SvgIconPropsSizeOverrides {
        xsmall: true
        xlarge: true
    }
}

export {}
