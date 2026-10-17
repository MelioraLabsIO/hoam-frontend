import type { SVGProps } from "react"

// Stroke icons drawn to match the design canvas (24px grid, round caps).
type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 20, strokeWidth = 2, ...rest }: IconProps) {
    return {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true,
        ...rest,
    }
}

export const HomeIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </svg>
)

export const BellIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" />
        <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
)

export const CardIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
        <path d="M16 15h2" />
    </svg>
)

export const ClipboardIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V3h6v1" />
        <path d="M9 10h6M9 14h6M9 18h3" />
    </svg>
)

export const CalendarIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
)

export const PinIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="M12 17v4" />
        <path d="M8 3h8l-1 6 3 3v2H6v-2l3-3z" />
    </svg>
)

export const ChevronRight = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="m9 6 6 6-6 6" />
    </svg>
)

export const ChevronLeft = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="m15 6-6 6 6 6" />
    </svg>
)

export const ChevronDown = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="m6 9 6 6 6-6" />
    </svg>
)

export const SearchIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </svg>
)

export const PlusIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="M12 5v14M5 12h14" />
    </svg>
)

export const FileIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
    </svg>
)

export const DownloadIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="M12 4v11" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 20h14" />
    </svg>
)

export const CheckIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="m5 12 5 5 9-10" />
    </svg>
)

export const XIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="M6 6l12 12M18 6 6 18" />
    </svg>
)

export const UsersIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
        <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
        <path d="M18 14a6.5 6.5 0 0 1 3.5 6" />
    </svg>
)

export const MegaphoneIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z" />
        <path d="M17 9a3 3 0 0 1 0 6" />
    </svg>
)

export const AlertIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="M12 3 2 20h20z" />
        <path d="M12 10v4M12 17h.01" />
    </svg>
)

export const MenuIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
)

export const LogoutIcon = (p: IconProps) => (
    <svg {...base(p)}>
        <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
        <path d="M10 16l-4-4 4-4" />
        <path d="M6 12h10" />
    </svg>
)
