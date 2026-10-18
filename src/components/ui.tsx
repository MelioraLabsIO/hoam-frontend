"use client"

/*
 * Building blocks shared by every portal, made from MUI components.
 * Every colour, size, radius and font comes from the theme (src/theme).
 */

import Avatar from "@mui/material/Avatar"
import Badge from "@mui/material/Badge"
import Box, { type BoxProps } from "@mui/material/Box"
import Card from "@mui/material/Card"
import Chip from "@mui/material/Chip"
import LinearProgress from "@mui/material/LinearProgress"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { Theme } from "@mui/material/styles"
import { visuallyHidden } from "@mui/utils"
import type { ReactNode } from "react"
import { HomeIcon } from "@/components/icons"

export type Tone = "gray" | "blue" | "teal" | "amber" | "purple" | "dark"

const TONE_COLOR = {
    gray: "neutral",
    blue: "blue",
    teal: "teal",
    amber: "amber",
    purple: "purple",
    dark: "nav",
} as const

/** Status pill. `large` is the bigger pill used in headers. */
export function Pill({
    tone = "gray",
    large,
    children,
}: {
    tone?: Tone
    large?: boolean
    children: ReactNode
}) {
    return (
        <Chip
            component="span"
            label={children}
            color={TONE_COLOR[tone]}
            variant={tone === "dark" ? "filled" : "soft"}
            size={large ? "medium" : "small"}
        />
    )
}

/** Small round counter, e.g. unread notices next to a tab label. */
export function CountDot({ count }: { count: number }) {
    return (
        <Badge
            badgeContent={count}
            color="amber"
            sx={{
                "& .MuiBadge-badge": {
                    position: "static",
                    transform: "none",
                },
            }}
        />
    )
}

export function BrandMark({ size = "md" }: { size?: "md" | "lg" }) {
    return (
        <Box
            component="span"
            sx={(theme) => ({
                width: theme.layout.brandMark[size],
                height: theme.layout.brandMark[size],
                borderRadius: `${theme.radius.sm}px`,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 auto",
            })}
        >
            <HomeIcon fontSize={size === "lg" ? "medium" : "small"} />
        </Box>
    )
}

/** Visually hidden text for screen readers. */
export function VisuallyHidden({ children }: { children: ReactNode }) {
    return (
        <Box component="span" sx={visuallyHidden}>
            {children}
        </Box>
    )
}

/** Page title block with optional eyebrow line and right-hand actions. */
export function PageHeader({
    eyebrow,
    title,
    description,
    actions,
}: {
    eyebrow?: ReactNode
    title: ReactNode
    description?: ReactNode
    actions?: ReactNode
}) {
    return (
        <Stack
            direction="row"
            sx={{
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 2,
            }}
        >
            <Stack sx={{ gap: 0.5, minWidth: 0 }}>
                {eyebrow && (
                    <Typography variant="subtitle2" color="text.secondary">
                        {eyebrow}
                    </Typography>
                )}
                <Typography variant="h1">{title}</Typography>
                {description && (
                    <Typography variant="lead" color="text.secondary">
                        {description}
                    </Typography>
                )}
            </Stack>
            {actions && (
                <Stack
                    direction="row"
                    sx={{ flexWrap: "wrap", alignItems: "center", gap: 1.25 }}
                >
                    {actions}
                </Stack>
            )}
        </Stack>
    )
}

/** Card heading with an optional link or control on the right. */
export function SectionHeader({
    title,
    action,
    size = "md",
}: {
    title: ReactNode
    action?: ReactNode
    size?: "sm" | "md" | "lg"
}) {
    const variant = size === "lg" ? "h3" : size === "sm" ? "h5" : "h4"
    return (
        <Stack
            direction="row"
            sx={{
                flexWrap: "wrap",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 1.5,
            }}
        >
            <Typography variant={variant} component="h2">
                {title}
            </Typography>
            {action}
        </Stack>
    )
}

export function StatCard({
    label,
    value,
    note,
    progress,
    valueTone,
}: {
    label: string
    value: ReactNode
    note?: ReactNode
    progress?: number
    valueTone?: "amber"
}) {
    return (
        <Card sx={{ p: 2.25, gap: 1.25 }}>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            <Typography
                variant="stat"
                color={valueTone === "amber" ? "amber.dark" : "text.primary"}
            >
                {value}
            </Typography>
            {progress !== undefined && (
                <LinearProgress value={progress} aria-label={label} />
            )}
            {note && (
                <Typography variant="caption" color="text.secondary">
                    {note}
                </Typography>
            )}
        </Card>
    )
}

export function DateTile({
    month,
    day,
}: {
    month: string
    day: string | number
}) {
    return (
        <Box
            aria-hidden="true"
            sx={(theme) => ({
                width: theme.layout.dateTile.width,
                height: theme.layout.dateTile.height,
                flex: "0 0 auto",
                borderRadius: `${theme.radius.sm}px`,
                bgcolor: "primary.soft",
                color: "primary.softContrast",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            })}
        >
            <Typography variant="dateMonth" component="span">
                {month}
            </Typography>
            <Typography variant="dateDay" component="span">
                {day}
            </Typography>
        </Box>
    )
}

/** Date tile + title + detail, used in "Coming up" lists. */
export function EventRow({
    month,
    day,
    title,
    detail,
}: {
    month: string
    day: string | number
    title: string
    detail: string
}) {
    return (
        <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
            <DateTile month={month} day={day} />
            <Stack sx={{ gap: 0.25, minWidth: 0 }}>
                <Typography sx={{ fontWeight: "fontWeightSemiBold" }}>{title}</Typography>
                <Typography variant="caption" color="text.secondary">
                    {month} {day} · {detail}
                </Typography>
            </Stack>
        </Stack>
    )
}

export function Announcement({
    meta,
    title,
    body,
    pinned,
    tag,
}: {
    meta: string
    title: string
    body?: string
    pinned?: boolean
    tag?: { label: string; tone: Tone }
}) {
    return (
        <Card component="article" sx={{ p: 2.25, gap: 1 }}>
            {pinned ? (
                <Typography
                    variant="caption"
                    sx={{ fontWeight: "fontWeightSemiBold" }}
                    color="amber.dark"
                >
                    Pinned · {meta}
                </Typography>
            ) : (
                <Stack
                    direction="row"
                    sx={{ flexWrap: "wrap", alignItems: "center", gap: 1 }}
                >
                    {tag && <Pill tone={tag.tone}>{tag.label}</Pill>}
                    <Typography variant="caption" color="text.secondary">
                        {meta}
                    </Typography>
                </Stack>
            )}
            <Typography variant="h6" component="h3">
                {title}
            </Typography>
            {body && (
                <Typography variant="lead" color="text.secondary">
                    {body}
                </Typography>
            )}
        </Card>
    )
}

export function KeyValue({
    label,
    value,
}: {
    label: ReactNode
    value: ReactNode
}) {
    return (
        <Stack
            direction="row"
            sx={{
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
            }}
        >
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "fontWeightSemiBold" }}>
                {value}
            </Typography>
        </Stack>
    )
}

/** Small bold link, e.g. "View all" next to a section title. */
export function TextLink({
    href,
    children,
}: {
    href: string
    children: ReactNode
}) {
    return (
        <Link href={href} variant="label">
            {children}
        </Link>
    )
}

/** Initials in a circle. `soft` uses the portal accent. */
export function Initials({
    children,
    soft,
}: {
    children: ReactNode
    soft?: boolean
}) {
    return (
        <Avatar variant={soft ? "soft" : "circular"} component="span">
            {children}
        </Avatar>
    )
}

/** A row in a list, separated from the next one by a divider line. */
export function ListRow({
    children,
    sx,
    ...rest
}: BoxProps) {
    return (
        <Box
            {...rest}
            sx={[
                {
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 1.5,
                    borderBottom: 1,
                    borderColor: "divider",
                    "&:last-child": { borderBottom: 0 },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {children}
        </Box>
    )
}

/** Grey rounded tile for compact facts (e.g. "Next payment"). */
export function Tile({ children, sx, ...rest }: BoxProps) {
    return (
        <Box
            {...rest}
            sx={[
                (theme: Theme) => ({
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.25,
                    px: 1.5,
                    py: 1.25,
                    borderRadius: `${theme.radius.md}px`,
                    bgcolor: "background.muted",
                    color: "text.primary",
                    "&[href]:hover": { bgcolor: "background.sunken" },
                }),
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {children}
        </Box>
    )
}

/** Booking block inside a calendar cell. */
export function CalendarBlock({
    tone = "blue",
    children,
}: {
    tone?: "blue" | "teal" | "gray"
    children: ReactNode
}) {
    const color = tone === "gray" ? "neutral" : tone
    return (
        <Box
            sx={(theme) => ({
                ...theme.typography.micro,
                fontWeight: theme.typography.fontWeightRegular,
                px: 1,
                py: 0.75,
                borderRadius: `${theme.radius.xs}px`,
                display: "flex",
                flexDirection: "column",
                gap: 0.125,
                bgcolor: `${color}.soft`,
                color: tone === "gray" ? "text.secondary" : `${color}.softContrast`,
            })}
        >
            {children}
        </Box>
    )
}

/** Rounded square with an icon, used at the top of auth cards. */
export function IconTile({ children }: { children: ReactNode }) {
    return (
        <Box
            aria-hidden="true"
            sx={(theme) => ({
                width: theme.layout.iconTile,
                height: theme.layout.iconTile,
                flex: "0 0 auto",
                borderRadius: `${theme.radius.xl}px`,
                bgcolor: "primary.soft",
                color: "primary.softContrast",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            })}
        >
            {children}
        </Box>
    )
}

/* ---------- Layout ---------- */

type GridKind = "stats" | "cards" | "wide"

/** Responsive grid whose columns wrap at the theme's minimum width. */
export function AutoGrid({
    kind = "cards",
    children,
    sx,
    ...rest
}: BoxProps & { kind?: GridKind }) {
    return (
        <Box
            {...rest}
            sx={[
                (theme: Theme) => ({
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fit, minmax(min(${theme.layout.grid[kind]}px, 100%), 1fr))`,
                    gap: 2,
                    "& > *": { minWidth: 0 },
                }),
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {children}
        </Box>
    )
}

/** Main column with a side column that wraps under on narrow screens. */
export function Split({
    main,
    side,
}: {
    main: ReactNode
    side: ReactNode
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "flex-start",
            }}
        >
            <Stack
                sx={(theme) => ({
                    flex: `999 1 ${theme.layout.split.main}px`,
                    minWidth: 0,
                    gap: 2,
                    "& > *": { minWidth: 0 },
                })}
            >
                {main}
            </Stack>
            <Stack
                sx={(theme) => ({
                    flex: `1 1 ${theme.layout.split.side}px`,
                    minWidth: 0,
                    gap: 2,
                    "& > *": { minWidth: 0 },
                })}
            >
                {side}
            </Stack>
        </Box>
    )
}
