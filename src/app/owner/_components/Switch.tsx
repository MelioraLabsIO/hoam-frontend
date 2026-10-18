"use client"

/** On/off toggle drawn like the design's switches (role="switch"). */
export default function Switch({
    checked,
    onChange,
    label,
    id,
    onColor = "var(--primary)",
}: {
    checked: boolean
    onChange: (next: boolean) => void
    label?: string
    id?: string
    onColor?: string
}) {
    return (
        <button
            type="button"
            id={id}
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            style={{
                width: 52,
                height: 32,
                flex: "0 0 auto",
                borderRadius: 16,
                border: "none",
                padding: 3,
                background: checked ? onColor : "#b6c1cf",
                display: "flex",
                justifyContent: checked ? "flex-end" : "flex-start",
                cursor: "pointer",
            }}
        >
            <span
                style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    background: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                }}
            />
        </button>
    )
}
