import type { Metadata } from "next"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import {
    AutoGrid,
    ListRow,
    PageHeader,
    SectionHeader,
    StatCard,
    TextLink,
} from "@/components/ui"
import {
    BookingsThisWeek,
    RequestQueue,
    type QueueRequest,
    type WeekBooking,
} from "./OverviewSections"
import QuickAnnouncement from "./QuickAnnouncement"

export const metadata: Metadata = { title: "Overview" }

// Placeholder data until the Supabase tables exist.
const REQUESTS: QueueRequest[] = [
    {
        title: "Fence replacement — cedar",
        home: "14 Willow Bend",
        status: "Needs vote",
        tone: "gray",
        age: "6d",
    },
    {
        title: "Streetlight out, cluster B",
        home: "Common area",
        status: "Vendor booked",
        tone: "teal",
        age: "3d",
    },
    {
        title: "Solar panel install",
        home: "7 Heron Way",
        status: "Needs vote",
        tone: "gray",
        age: "2d",
    },
    {
        title: "Gate keypad unresponsive",
        home: "North entrance",
        status: "New",
        tone: "amber",
        age: "4h",
    },
]

const PAST_DUE = [
    {
        home: "22 Marsh Lane",
        detail: "2 quarters · last reminder Oct 1",
        amount: "$570.00",
    },
    {
        home: "3 Cattail Court",
        detail: "1 quarter + late fee · payment plan",
        amount: "$310.00",
    },
    {
        home: "41 Willow Bend",
        detail: "1 quarter · no reminder yet",
        amount: "$285.00",
    },
    {
        home: "18 Heron Way",
        detail: "1 quarter · last reminder Oct 1",
        amount: "$285.00",
    },
]

const BOOKINGS: WeekBooking[] = [
    {
        dow: "FRI",
        day: 16,
        title: "Clubhouse · Birthday party",
        detail: "2–6 PM · 9 Heron Way",
        tone: "blue",
    },
    {
        dow: "SAT",
        day: 17,
        title: "Tennis · Court 1",
        detail: "10 AM–12 PM · 30 Marsh Ln",
        tone: "teal",
    },
    {
        dow: "SUN",
        day: 18,
        title: "Clubhouse · Book club",
        detail: "2–4 PM · 14 Willow Bend",
        tone: "blue",
    },
]

export default function ManagerOverview() {
    return (
        <>
            <PageHeader
                eyebrow="Q4 · Week of Oct 12"
                title="Overview"
                actions={
                    <>
                        <Button>Export report</Button>
                        <Button variant="contained" href="/manager/announcements">
                            New announcement
                        </Button>
                    </>
                }
            />

            <AutoGrid kind="stats">
                <StatCard
                    label="Q4 dues collected"
                    value="62%"
                    progress={62}
                    note="$40,280 of $64,980 · due Nov 1"
                />
                <StatCard
                    label="Past due 30+ days"
                    value="$3,420"
                    valueTone="amber"
                    note="9 households"
                />
                <StatCard
                    label="Open requests"
                    value="7"
                    note="3 maintenance · 4 architectural"
                />
                <StatCard
                    label="Open violations"
                    value="5"
                    note="2 past their resolve-by date"
                />
            </AutoGrid>

            <AutoGrid kind="wide">
                <RequestQueue requests={REQUESTS} />

                <Card component="section">
                    <SectionHeader
                        title="Past-due accounts"
                        action={
                            <TextLink href="/manager/billing">
                                Send reminders
                            </TextLink>
                        }
                    />
                    <Stack>
                        {PAST_DUE.map((a) => (
                            <ListRow key={a.home}>
                                <Stack
                                    sx={{
                                        flex: "1 1 auto",
                                        minWidth: 0,
                                        gap: 0.25,
                                    }}
                                >
                                    <Typography
                                        sx={{ fontWeight: "fontWeightSemiBold" }}
                                    >
                                        {a.home}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {a.detail}
                                    </Typography>
                                </Stack>
                                <Typography
                                    component="span"
                                    color="amber.dark"
                                    sx={{ fontWeight: "fontWeightBold" }}
                                >
                                    {a.amount}
                                </Typography>
                            </ListRow>
                        ))}
                    </Stack>
                </Card>

                <BookingsThisWeek bookings={BOOKINGS} />

                <QuickAnnouncement />
            </AutoGrid>
        </>
    )
}
