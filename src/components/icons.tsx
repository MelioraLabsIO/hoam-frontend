import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon"

/*
 * Stroke icons drawn to match the design canvas (24px grid, round caps).
 * They are MUI SvgIcons: size them with `fontSize` (xsmall, small, medium,
 * large, xlarge from the theme) and colour them with `color` or the parent.
 */
export type IconProps = SvgIconProps & { strokeWidth?: number }

export function StrokeIcon({ strokeWidth = 2, children, sx, ...rest }: IconProps) {
    return (
        <SvgIcon
            viewBox="0 0 24 24"
            aria-hidden
            sx={[
                {
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...rest}
        >
            {children}
        </SvgIcon>
    )
}

export const HomeIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </StrokeIcon>
)

export const BellIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" />
        <path d="M10 20a2 2 0 0 0 4 0" />
    </StrokeIcon>
)

export const CardIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
        <path d="M16 15h2" />
    </StrokeIcon>
)

export const ClipboardIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V3h6v1" />
        <path d="M9 10h6M9 14h6M9 18h3" />
    </StrokeIcon>
)

export const CalendarIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
    </StrokeIcon>
)

export const PinIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M12 17v4" />
        <path d="M8 3h8l-1 6 3 3v2H6v-2l3-3z" />
    </StrokeIcon>
)

export const ChevronRight = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="m9 6 6 6-6 6" />
    </StrokeIcon>
)

export const ChevronLeft = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="m15 6-6 6 6 6" />
    </StrokeIcon>
)

export const ChevronDown = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="m6 9 6 6 6-6" />
    </StrokeIcon>
)

export const SearchIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </StrokeIcon>
)

export const PlusIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M12 5v14M5 12h14" />
    </StrokeIcon>
)

export const FileIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
    </StrokeIcon>
)

export const DownloadIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M12 4v11" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 20h14" />
    </StrokeIcon>
)

export const CheckIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="m5 12 5 5 9-10" />
    </StrokeIcon>
)

export const XIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M6 6l12 12M18 6 6 18" />
    </StrokeIcon>
)

export const UsersIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
        <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
        <path d="M18 14a6.5 6.5 0 0 1 3.5 6" />
    </StrokeIcon>
)

export const MegaphoneIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z" />
        <path d="M17 9a3 3 0 0 1 0 6" />
    </StrokeIcon>
)

export const AlertIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M12 3 2 20h20z" />
        <path d="M12 10v4M12 17h.01" />
    </StrokeIcon>
)

export const MenuIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M4 7h16M4 12h16M4 17h16" />
    </StrokeIcon>
)

export const LogoutIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
        <path d="M10 16l-4-4 4-4" />
        <path d="M6 12h10" />
    </StrokeIcon>
)

export const MailIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
    </StrokeIcon>
)

export const ShieldIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
        <path d="m9 12 2 2 4-4" />
    </StrokeIcon>
)

export const AlertCircleIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16.5v.01" />
    </StrokeIcon>
)

export const SunIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </StrokeIcon>
)

export const MoonIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
    </StrokeIcon>
)

export const MonitorIcon = (p: IconProps) => (
    <StrokeIcon {...p}>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
    </StrokeIcon>
)
