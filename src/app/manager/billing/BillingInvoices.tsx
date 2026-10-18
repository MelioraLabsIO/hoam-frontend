"use client"

import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { Pill, type Tone } from "@/components/ui"

type Status = "paid" | "due" | "past"

// Placeholder data until the Supabase tables exist.
const INVOICES: {
    home: string
    label: string
    amount: string
    status: Status
    method: string
}[] = [
    {
        home: "7 Heron Way",
        label: "Q4 2026",
        amount: "$285.00",
        status: "paid",
        method: "Autopay · Oct 1",
    },
    {
        home: "30 Marsh Lane",
        label: "Q4 2026",
        amount: "$285.00",
        status: "paid",
        method: "Card · Oct 3",
    },
    {
        home: "14 Willow Bend Ct",
        label: "Q4 2026",
        amount: "$285.00",
        status: "due",
        method: "—",
    },
    {
        home: "9 Heron Way",
        label: "Q4 2026",
        amount: "$285.00",
        status: "paid",
        method: "Autopay · Oct 1",
    },
    {
        home: "22 Marsh Lane",
        label: "Q3 2026",
        amount: "$285.00",
        status: "past",
        method: "—",
    },
    {
        home: "3 Cattail Court",
        label: "Q3 2026 + late fee",
        amount: "$310.00",
        status: "past",
        method: "Payment plan",
    },
    {
        home: "41 Willow Bend Ct",
        label: "Q4 2026",
        amount: "$285.00",
        status: "due",
        method: "—",
    },
]

const STATUS: Record<Status, { label: string; tone: Tone }> = {
    paid: { label: "Paid", tone: "blue" },
    due: { label: "Due Nov 1", tone: "gray" },
    past: { label: "Past due", tone: "amber" },
}

const TABS: { id: "all" | Status; label: string }[] = [
    { id: "all", label: "All" },
    { id: "paid", label: "Paid" },
    { id: "due", label: "Due" },
    { id: "past", label: "Past due" },
]

export default function BillingInvoices() {
    const [tab, setTab] = useState<"all" | Status>("all")
    const rows = INVOICES.filter((i) => tab === "all" || i.status === tab)

    return (
        <Card component="section">
            <Stack
                direction="row"
                sx={{
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                }}
            >
                <Typography variant="h4" component="h2">
                    Invoices
                </Typography>
                <ToggleButtonGroup
                    exclusive
                    aria-label="Invoice status"
                    value={tab}
                    onChange={(_, next: "all" | Status | null) => {
                        if (next) setTab(next)
                    }}
                >
                    {TABS.map((t) => (
                        <ToggleButton
                            key={t.id}
                            value={t.id}
                            aria-controls="billing-invoices"
                        >
                            {t.label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>
            <TableContainer id="billing-invoices" aria-live="polite">
                <Table sx={(theme) => ({ minWidth: theme.spacing(75) })}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Home</TableCell>
                            <TableCell>Invoice</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Method</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((i) => (
                            <TableRow key={i.home + i.label}>
                                <TableCell
                                    sx={{ fontWeight: "fontWeightSemiBold" }}
                                >
                                    {i.home}
                                </TableCell>
                                <TableCell sx={{ color: "text.secondary" }}>
                                    {i.label}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "fontWeightSemiBold" }}
                                >
                                    {i.amount}
                                </TableCell>
                                <TableCell>
                                    <Pill tone={STATUS[i.status].tone}>
                                        {STATUS[i.status].label}
                                    </Pill>
                                </TableCell>
                                <TableCell sx={{ color: "text.secondary" }}>
                                    {i.method}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}
