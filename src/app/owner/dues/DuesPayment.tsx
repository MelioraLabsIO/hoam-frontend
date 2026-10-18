"use client"

import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { Split, VisuallyHidden } from "@/components/ui"

// Placeholder data until the Supabase tables exist.
const HOMES = [
    { id: "a", address: "14 Willow Bend Ct", note: "You live here" },
    {
        id: "b",
        address: "9 Heron Way",
        note: "Rented · tenant does not see this",
    },
]
const AMOUNT = 285

export default function DuesPayment() {
    const [picked, setPicked] = useState<Record<string, boolean>>({
        a: true,
        b: true,
    })
    const [autopay, setAutopay] = useState(false)
    const [paid, setPaid] = useState<string | null>(null)

    const n = HOMES.filter((h) => picked[h.id]).length
    const total = `$${(n * AMOUNT).toFixed(2)}`

    return (
        <Split
            main={
                <Card component="section" sx={{ p: 2.75, gap: 2 }}>
                    <Typography variant="h4" component="h2">
                        Q4 2026 · due Nov 1
                    </Typography>
                    {HOMES.map((h) => {
                        const on = !!picked[h.id]
                        return (
                            <Box
                                key={h.id}
                                component="label"
                                sx={(theme) => ({
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 1.75,
                                    p: on ? 1.625 : 1.75,
                                    borderRadius: `${theme.radius.lg}px`,
                                    border: on ? 2 : 1,
                                    borderColor: on
                                        ? "primary.main"
                                        : "border.main",
                                    cursor: "pointer",
                                })}
                            >
                                <Checkbox
                                    checked={on}
                                    onChange={() => {
                                        setPaid(null)
                                        setPicked({ ...picked, [h.id]: !on })
                                    }}
                                    sx={{ p: 0, mt: 0.25 }}
                                />
                                <Stack sx={{ flex: "1 1 auto", minWidth: 0, gap: 0.75 }}>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            flexWrap: "wrap",
                                            alignItems: "baseline",
                                            justifyContent: "space-between",
                                            gap: 1.5,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            component="span"
                                            sx={{ fontWeight: "fontWeightSemiBold" }}
                                        >
                                            {h.address}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            component="span"
                                            sx={{ fontWeight: "fontWeightBold" }}
                                        >
                                            $285.00
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        color="text.secondary"
                                    >
                                        Assessment $265.00 · Reserve fund $20.00 ·{" "}
                                        {h.note}
                                    </Typography>
                                </Stack>
                            </Box>
                        )
                    })}
                    <Stack
                        direction="row"
                        sx={{
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1.5,
                            pt: 1.75,
                            borderTop: 1,
                            borderColor: "divider",
                        }}
                    >
                        <Stack sx={{ gap: 0.25 }}>
                            <Typography
                                variant="body2"
                                component="span"
                                color="text.secondary"
                            >
                                Paying from Bank account ••4821 ·{" "}
                                <Link href="#">Change</Link>
                            </Typography>
                            <Typography variant="h2" component="span">
                                {total}
                            </Typography>
                        </Stack>
                        <Button
                            variant="contained"
                            size="large"
                            disabled={n === 0}
                            onClick={() =>
                                setPaid(
                                    `Payment of ${total} is ready to send once payments are connected.`
                                )
                            }
                        >
                            {n === 0
                                ? "Select a home"
                                : `Pay ${n} ${n === 1 ? "home" : "homes"}`}
                        </Button>
                    </Stack>
                    {paid && (
                        <Alert severity="info" role="status">
                            {paid}
                        </Alert>
                    )}
                </Card>
            }
            side={
                <Stack component="aside" sx={{ gap: 2 }}>
                    <Card
                        component="section"
                        sx={{
                            p: 2.25,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1.75,
                        }}
                    >
                        <Stack
                            component="label"
                            htmlFor="autopay"
                            sx={{
                                flex: "1 1 auto",
                                minWidth: 0,
                                gap: 0.375,
                                cursor: "pointer",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                component="span"
                                sx={{ fontWeight: "fontWeightSemiBold" }}
                            >
                                Autopay
                            </Typography>
                            <Typography
                                variant="body2"
                                component="span"
                                color="text.secondary"
                            >
                                {autopay
                                    ? "On for both homes · pays on the due date"
                                    : "Off · never miss a due date"}
                            </Typography>
                        </Stack>
                        <Switch
                            id="autopay"
                            checked={autopay}
                            onChange={(e) => setAutopay(e.target.checked)}
                        />
                    </Card>
                    <Card component="section" sx={{ p: 2.25, gap: 1.25 }}>
                        <Typography variant="h5" component="h2">
                            Statements
                        </Typography>
                        <Link href="#">2026 year-to-date (PDF)</Link>
                        <Link href="#">2025 annual statement (PDF)</Link>
                        <Link href="#">Request a payoff letter</Link>
                    </Card>
                </Stack>
            }
        />
    )
}

export type Payment = {
    date: string
    home: string
    description: string
    amount: string
    waived?: boolean
}

/** Payment history table (client so its minimum width can come from the theme). */
export function PaymentHistory({ rows }: { rows: Payment[] }) {
    return (
        <TableContainer>
            <Table sx={(theme) => ({ minWidth: theme.spacing(75) })}>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Home</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Receipt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((p) => (
                        <TableRow key={p.date + p.home + p.description}>
                            <TableCell>{p.date}</TableCell>
                            <TableCell>{p.home}</TableCell>
                            <TableCell sx={{ color: "text.secondary" }}>
                                {p.description}
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "fontWeightSemiBold",
                                    ...(p.waived
                                        ? {
                                              color: "text.secondary",
                                              textDecoration: "line-through",
                                          }
                                        : {}),
                                }}
                            >
                                {p.waived && <VisuallyHidden>Waived: </VisuallyHidden>}
                                {p.amount}
                            </TableCell>
                            <TableCell>
                                {p.waived ? (
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        color="text.secondary"
                                    >
                                        —
                                    </Typography>
                                ) : (
                                    <Link
                                        href="#"
                                        aria-label={`Receipt PDF, ${p.description}, ${p.home}`}
                                    >
                                        PDF
                                    </Link>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
