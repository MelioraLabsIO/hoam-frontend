"use client"

/*
 * Overview cards that need theme measures (table min width, booking day
 * column, booking block radius), so they render on the client.
 */

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { Pill, SectionHeader, TextLink, type Tone } from "@/components/ui"

export type QueueRequest = {
    title: string
    home: string
    status: string
    tone: Tone
    age: string
}

export type WeekBooking = {
    dow: string
    day: number
    title: string
    detail: string
    tone: "blue" | "teal"
}

export function RequestQueue({ requests }: { requests: QueueRequest[] }) {
    return (
        <Card component="section">
            <SectionHeader
                title="Request queue"
                action={<TextLink href="/manager/requests">View all</TextLink>}
            />
            <TableContainer>
                <Table sx={(theme) => ({ minWidth: theme.spacing(55) })}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Request</TableCell>
                            <TableCell>Home</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Age</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((r) => (
                            <TableRow key={r.title}>
                                <TableCell
                                    sx={{ fontWeight: "fontWeightSemiBold" }}
                                >
                                    {r.title}
                                </TableCell>
                                <TableCell sx={{ color: "text.secondary" }}>
                                    {r.home}
                                </TableCell>
                                <TableCell>
                                    <Pill tone={r.tone}>{r.status}</Pill>
                                </TableCell>
                                <TableCell sx={{ color: "text.secondary" }}>
                                    {r.age}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

export function BookingsThisWeek({ bookings }: { bookings: WeekBooking[] }) {
    return (
        <Card component="section">
            <SectionHeader
                title="Bookings this week"
                action={<TextLink href="/manager/amenities">Calendar</TextLink>}
            />
            <Stack sx={{ gap: 1.25 }}>
                {bookings.map((b) => (
                    <Stack
                        direction="row"
                        key={b.title + b.day}
                        sx={{ alignItems: "center", gap: 1.75 }}
                    >
                        <Stack
                            sx={(theme) => ({
                                width: theme.spacing(6.5),
                                flex: "0 0 auto",
                                textAlign: "center",
                            })}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontWeight: "fontWeightBold" }}
                            >
                                {b.dow}
                            </Typography>
                            <Typography variant="h4" component="span">
                                {b.day}
                            </Typography>
                        </Stack>
                        <Box
                            sx={(theme) => ({
                                flex: "1 1 auto",
                                minWidth: 0,
                                px: 1.75,
                                py: 1.25,
                                borderRadius: `${theme.radius.md}px`,
                                bgcolor: `${b.tone}.soft`,
                                color: `${b.tone}.softContrast`,
                            })}
                        >
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
                                    sx={{ fontWeight: "fontWeightSemiBold" }}
                                >
                                    {b.title}
                                </Typography>
                                <Typography variant="body2">
                                    {b.detail}
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                ))}
            </Stack>
        </Card>
    )
}
