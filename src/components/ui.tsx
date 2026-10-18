import Link from "next/link"
import type { ReactNode } from "react"
import { HomeIcon } from "@/components/icons"

/* Small building blocks shared by every portal. Styling lives in globals.css. */

export type Tone = "gray" | "blue" | "teal" | "amber" | "purple" | "dark"

export function Pill({
    tone = "gray",
    large,
    children,
}: {
    tone?: Tone
    large?: boolean
    children: ReactNode
}) {
    const cls = ["pill", tone !== "gray" && `pill-${tone}`, large && "pill-lg"]
        .filter(Boolean)
        .join(" ")
    return <span className={cls}>{children}</span>
}

export function BrandMark({ size = 36 }: { size?: number }) {
    return (
        <span
            style={{
                width: size,
                height: size,
                borderRadius: 10,
                background: "var(--primary)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 auto",
            }}
        >
            <HomeIcon size={Math.round(size * 0.56)} />
        </span>
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
        <div
            className="row-wrap"
            style={{
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 16,
            }}
        >
            <div className="stack" style={{ gap: 4 }}>
                {eyebrow && <div className="eyebrow">{eyebrow}</div>}
                <h1 className="h1">{title}</h1>
                {description && <p className="lead">{description}</p>}
            </div>
            {actions && <div className="row-wrap">{actions}</div>}
        </div>
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
    const cls = size === "lg" ? "h2-lg" : size === "sm" ? "h3" : "h2"
    return (
        <div className="spread">
            <h2 className={cls}>{title}</h2>
            {action}
        </div>
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
        <div className="card card-tight" style={{ padding: 18 }}>
            <span className="stat-label">{label}</span>
            <span
                className="stat-value"
                style={
                    valueTone === "amber"
                        ? { color: "var(--amber-fg)" }
                        : undefined
                }
            >
                {value}
            </span>
            {progress !== undefined && (
                <div
                    className="progress"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <span style={{ width: `${progress}%` }} />
                </div>
            )}
            {note && <span className="stat-note">{note}</span>}
        </div>
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
        <div className="date-tile" aria-hidden="true">
            <span className="date-tile-month">{month.toUpperCase()}</span>
            <span className="date-tile-day">{day}</span>
        </div>
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
        <div className="row">
            <DateTile month={month} day={day} />
            <div className="stack" style={{ gap: 2 }}>
                <span className="strong">{title}</span>
                <span className="text-sm muted">
                    {month} {day} · {detail}
                </span>
            </div>
        </div>
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
        <article className="card card-tight" style={{ padding: 18, gap: 8 }}>
            {pinned ? (
                <span
                    className="text-sm strong"
                    style={{ color: "var(--amber-fg)" }}
                >
                    Pinned · {meta}
                </span>
            ) : (
                <div className="row-wrap" style={{ gap: 8 }}>
                    {tag && <Pill tone={tag.tone}>{tag.label}</Pill>}
                    <span className="text-sm muted">{meta}</span>
                </div>
            )}
            <span className="text-lg strong" style={{ lineHeight: 1.3 }}>
                {title}
            </span>
            {body && <span className="lead">{body}</span>}
        </article>
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
        <div className="spread" style={{ alignItems: "center", fontSize: 14 }}>
            <span className="muted">{label}</span>
            <span className="strong">{value}</span>
        </div>
    )
}

export function TextLink({
    href,
    children,
}: {
    href: string
    children: ReactNode
}) {
    return (
        <Link href={href} className="link-strong">
            {children}
        </Link>
    )
}
