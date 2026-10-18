"use client"

import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import type { Theme } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TextField from "@mui/material/TextField"
import ToggleButton from "@mui/material/ToggleButton"
import Typography from "@mui/material/Typography"
import { visuallyHidden } from "@mui/utils"
import { useState } from "react"
import { SearchIcon } from "@/components/icons"
import { Pill } from "@/components/ui"

type Household = {
    home: string
    names: string
    email: string
    type: "Owner" | "Renter"
    due: number
    past: boolean
    autopay: boolean
    app: "Active" | "Invited" | "Not invited"
}

// Placeholder data until the Supabase tables exist.
const HOUSEHOLDS: Household[] = [
    {
        home: "14 Willow Bend Ct",
        names: "Dana & Luis Ortega",
        email: "dana.ortega@example.com",
        type: "Owner",
        due: 285,
        past: false,
        autopay: false,
        app: "Active",
    },
    {
        home: "22 Marsh Lane",
        names: "Priya Natarajan",
        email: "priya.n@example.com",
        type: "Owner",
        due: 570,
        past: true,
        autopay: false,
        app: "Active",
    },
    {
        home: "3 Cattail Court",
        names: "Marcus Webb",
        email: "mwebb@example.com",
        type: "Owner",
        due: 310,
        past: true,
        autopay: false,
        app: "Invited",
    },
    {
        home: "7 Heron Way",
        names: "Helen & Tom Fischer",
        email: "fischers@example.com",
        type: "Owner",
        due: 0,
        past: false,
        autopay: true,
        app: "Active",
    },
    {
        home: "9 Heron Way",
        names: "Jordan Lee (tenant)",
        email: "jlee@example.com",
        type: "Renter",
        due: 0,
        past: false,
        autopay: true,
        app: "Active",
    },
    {
        home: "18 Heron Way",
        names: "Sam Okafor",
        email: "sam.okafor@example.com",
        type: "Owner",
        due: 285,
        past: true,
        autopay: false,
        app: "Not invited",
    },
    {
        home: "30 Marsh Lane",
        names: "Ruth Abernathy",
        email: "ruth.a@example.com",
        type: "Owner",
        due: 0,
        past: false,
        autopay: true,
        app: "Active",
    },
    {
        home: "41 Willow Bend Ct",
        names: "Kai Mendes (tenant)",
        email: "kai.m@example.com",
        type: "Renter",
        due: 285,
        past: true,
        autopay: false,
        app: "Active",
    },
]

const TOTAL_HOMES = 228

const FILTERS: {
    id: string
    label: string
    test: (h: Household) => boolean
}[] = [
    { id: "all", label: "All homes", test: () => true },
    { id: "past", label: "Past due", test: (h) => h.past },
    { id: "noauto", label: "Autopay off", test: (h) => !h.autopay },
    { id: "rent", label: "Renters", test: (h) => h.type === "Renter" },
]

/** White bordered pill that turns dark when pressed. */
const filterChipSx = (theme: Theme) => ({
    minHeight: theme.layout.tapTarget,
    borderRadius: `${theme.radius.pill}px`,
    border: 1,
    borderColor: "border.input",
    bgcolor: "background.paper",
    color: "text.primary",
    "&:hover": { bgcolor: "background.paper", borderColor: "border.strong" },
    "&.Mui-selected, &.Mui-selected:hover": { borderColor: "nav.main" },
})

const pagerSx = (theme: Theme) => ({
    borderRadius: `${theme.radius.sm}px`,
    fontSize: theme.typography.body2.fontSize,
    px: 1.75,
})

const HEADERS = ["Home", "Residents", "Type", "Balance", "Autopay", "App"]

function Balance({ h }: { h: Household }) {
    if (h.due === 0) return <Pill tone="blue">Paid up</Pill>
    const amount = `$${h.due.toFixed(2)}`
    return h.past ? (
        <Pill tone="amber">Past due {amount}</Pill>
    ) : (
        <Pill>Due {amount}</Pill>
    )
}

export default function ResidentsDirectory() {
    const [filter, setFilter] = useState("all")
    const [query, setQuery] = useState("")

    const current = FILTERS.find((f) => f.id === filter) ?? FILTERS[0]
    const q = query.trim().toLowerCase()
    const rows = HOUSEHOLDS.filter(current.test).filter(
        (h) =>
            !q ||
            [h.home, h.names, h.email].some((v) => v.toLowerCase().includes(q))
    )

    return (
        <>
            <Stack
                direction="row"
                sx={{ flexWrap: "wrap", alignItems: "center", gap: 1.5 }}
            >
                <TextField
                    id="res-search"
                    type="search"
                    label="Search households"
                    placeholder="Search name, address or email"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={(theme) => ({
                        flex: `1 1 ${theme.spacing(35)}`,
                        maxWidth: theme.spacing(52.5),
                    })}
                    slotProps={{
                        inputLabel: { sx: visuallyHidden },
                        input: {
                            sx: (theme) => ({
                                borderRadius: `${theme.radius.md}px`,
                            }),
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Stack
                    direction="row"
                    role="group"
                    aria-label="Filter"
                    sx={{ flexWrap: "wrap", alignItems: "center", gap: 1 }}
                >
                    {FILTERS.map((f) => (
                        <ToggleButton
                            key={f.id}
                            value={f.id}
                            color="nav"
                            selected={f.id === current.id}
                            onChange={() => setFilter(f.id)}
                            sx={filterChipSx}
                        >
                            {f.label}
                        </ToggleButton>
                    ))}
                </Stack>
            </Stack>

            <Card component="section" sx={{ pt: 1, px: 2.5, pb: 1.5, gap: 0 }}>
                <TableContainer>
                    <Table sx={(theme) => ({ minWidth: theme.spacing(95) })}>
                        <TableHead>
                            <TableRow>
                                {HEADERS.map((h) => (
                                    <TableCell key={h} sx={{ pt: 1.75 }}>
                                        {h}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((h) => (
                                <TableRow key={h.home}>
                                    <TableCell
                                        sx={{ fontWeight: "fontWeightSemiBold" }}
                                    >
                                        {h.home}
                                    </TableCell>
                                    <TableCell>
                                        <Stack sx={{ gap: 0.25 }}>
                                            <Typography
                                                variant="inherit"
                                                component="span"
                                            >
                                                {h.names}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {h.email}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={{ color: "text.secondary" }}>
                                        {h.type}
                                    </TableCell>
                                    <TableCell>
                                        <Balance h={h} />
                                    </TableCell>
                                    <TableCell sx={{ color: "text.secondary" }}>
                                        {h.autopay ? "On" : "Off"}
                                    </TableCell>
                                    <TableCell sx={{ color: "text.secondary" }}>
                                        {h.app}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {rows.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        sx={{ color: "text.secondary" }}
                                    >
                                        No households match.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack
                    direction="row"
                    sx={{
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1.5,
                        pt: 1.5,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        role="status"
                    >
                        Showing {rows.length} of {TOTAL_HOMES} homes
                    </Typography>
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                        <Button sx={pagerSx}>Previous</Button>
                        <Button sx={pagerSx}>Next</Button>
                    </Stack>
                </Stack>
            </Card>
        </>
    )
}
