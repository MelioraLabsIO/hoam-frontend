import type { Metadata } from "next"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import LinearProgress from "@mui/material/LinearProgress"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import {
    AutoGrid,
    KeyValue,
    PageHeader,
    Split,
    StatCard,
} from "@/components/ui"
import BillingInvoices from "./BillingInvoices"

export const metadata: Metadata = { title: "Dues & billing" }

// Placeholder data until the Supabase tables exist.
const SCHEDULE: { label: string; value: string }[] = [
    { label: "Frequency", value: "Quarterly" },
    { label: "Assessment", value: "$265.00" },
    { label: "Reserve contribution", value: "$20.00" },
    { label: "Late fee", value: "$25 after 15 days" },
    { label: "Next invoices", value: "Jan 1, 2027" },
]

const AUTOPAY = { enrolled: 96, total: 228 }

export default function ManagerBilling() {
    const autopayPct = Math.round((AUTOPAY.enrolled / AUTOPAY.total) * 100)
    return (
        <>
            <PageHeader
                eyebrow="Q4 2026 billing cycle"
                title="Dues & billing"
                actions={
                    <>
                        <Button>Record payment</Button>
                        <Button variant="contained">Send reminders</Button>
                    </>
                }
            />

            <AutoGrid kind="stats">
                <StatCard
                    label="Billed"
                    value="$64,980"
                    note="228 homes × $285"
                />
                <StatCard
                    label="Collected"
                    value={
                        <Typography
                            component="span"
                            variant="inherit"
                            color="primary.softContrast"
                        >
                            $40,280
                        </Typography>
                    }
                    note="141 homes paid"
                />
                <StatCard
                    label="Outstanding"
                    value="$24,700"
                    note="due Nov 1"
                />
                <StatCard
                    label="Past due (prior quarters)"
                    value="$3,420"
                    valueTone="amber"
                    note="9 homes · 2 on payment plans"
                />
            </AutoGrid>

            <Split
                main={<BillingInvoices />}
                side={
                    <>
                        <Card component="section" sx={{ gap: 1.5 }}>
                            <Typography variant="h5" component="h2">
                                Assessment schedule
                            </Typography>
                            <Stack sx={{ gap: 1.25 }}>
                                {SCHEDULE.map((s) => (
                                    <KeyValue
                                        key={s.label}
                                        label={s.label}
                                        value={s.value}
                                    />
                                ))}
                            </Stack>
                            <Button>Edit schedule</Button>
                        </Card>
                        <Card component="section" sx={{ gap: 1.5 }}>
                            <Typography variant="h5" component="h2">
                                Autopay
                            </Typography>
                            <Stack
                                direction="row"
                                sx={{ alignItems: "baseline", gap: 1 }}
                            >
                                <Typography variant="h2" component="span">
                                    {AUTOPAY.enrolled}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    of {AUTOPAY.total} homes enrolled
                                </Typography>
                            </Stack>
                            <LinearProgress
                                value={autopayPct}
                                aria-label="Autopay enrollment"
                            />
                            <Button
                                variant="text"
                                size="small"
                                sx={{ alignSelf: "flex-start", p: 0 }}
                            >
                                Invite the rest to enroll
                            </Button>
                        </Card>
                    </>
                }
            />
        </>
    )
}
