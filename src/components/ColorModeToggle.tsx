"use client"

import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Tooltip from "@mui/material/Tooltip"
import { useColorScheme } from "@mui/material/styles"
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons"

const MODES = [
    { value: "light", label: "Light", Icon: SunIcon },
    { value: "dark", label: "Dark", Icon: MoonIcon },
    { value: "system", label: "Match device", Icon: MonitorIcon },
] as const

/** Light / dark / system switch backed by MUI's colour-scheme store. */
export default function ColorModeToggle({
    fullWidth,
    onDark,
}: {
    fullWidth?: boolean
    /** Drawn on the dark manager sidebar. */
    onDark?: boolean
}) {
    const { mode, setMode } = useColorScheme()
    return (
        <ToggleButtonGroup
            exclusive
            size="small"
            value={mode ?? "system"}
            onChange={(_, next) => next && setMode(next)}
            aria-label="Colour theme"
            fullWidth={fullWidth}
            color={onDark ? "nav" : "standard"}
        >
            {MODES.map(({ value, label, Icon }) => (
                <Tooltip key={value} title={label}>
                    <ToggleButton value={value} aria-label={label}>
                        <Icon fontSize="xsmall" />
                    </ToggleButton>
                </Tooltip>
            ))}
        </ToggleButtonGroup>
    )
}
