import type { Metadata } from "next"
import NextLinkComposed from "@/theme/NextLinkComposed"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import {
    Announcement,
    AutoGrid,
    DateTile,
    PageHeader,
    Split,
} from "@/components/ui"

export const metadata: Metadata = { title: "Home" }

// Placeholder data until the Supabase tables exist.
const TENANT = {
    firstName: "Jordan",
    home: "9 Heron Way",
    landlord: "Dana Ortega",
}

const PICKUP_DAYS = [
    { label: "Trash & recycling", day: "Tuesday" },
    { label: "Leaf and yard waste", day: "Thursday" },
]

const NEWS: { meta: string; title: string; body?: string; pinned?: boolean }[] =
    [
        {
            meta: "Oct 12",
            title: "Pool resurfacing starts Oct 21 — closed for two weeks",
            body: "The clubhouse stays open. Gate codes reset on reopening.",
            pinned: true,
        },
        {
            meta: "Management · Oct 10",
            title: "Leaf pickup moves to Thursdays",
        },
    ]

const EVENTS = [
    {
        month: "Oct",
        day: 31,
        title: "Trunk-or-treat",
        detail: "5:30 PM · North lot",
    },
    {
        month: "Nov",
        day: 4,
        title: "Pool reopens",
        detail: "New gate codes posted",
    },
]

export default function TenantHome() {
    return (
        <>
            <PageHeader
                title={`Welcome home, ${TENANT.firstName}`}
                description={`Your landlord, ${TENANT.landlord}, handles HOA dues and notices for ${TENANT.home}.`}
            />

            <AutoGrid kind="cards">
                <Card
                    component={NextLinkComposed}
                    href="/tenant/maintenance"
                    variant="hero"
                    sx={{ gap: 0.75, textDecoration: "none" }}
                >
                    <Typography variant="h4" component="span">
                        Report an issue
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Streetlights, gates, common areas. Your landlord gets a
                        copy.
                    </Typography>
                </Card>
                <Card
                    component={NextLinkComposed}
                    href="/tenant/amenities"
                    sx={{ gap: 0.75, textDecoration: "none" }}
                >
                    <Typography variant="h4" component="span">
                        Book an amenity
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Clubhouse, tennis and pickleball courts
                    </Typography>
                </Card>
                <Card component="section" sx={{ gap: 1 }}>
                    <Typography variant="h4" component="h2">
                        Pickup days
                    </Typography>
                    {PICKUP_DAYS.map((p) => (
                        <Typography
                            key={p.label}
                            variant="body2"
                            color="text.secondary"
                        >
                            {p.label} · {p.day}
                        </Typography>
                    ))}
                </Card>
            </AutoGrid>

            <Split
                main={
                    <Stack component="section" sx={{ gap: 1.5 }}>
                        <Typography variant="h3" component="h2">
                            Community news
                        </Typography>
                        {NEWS.map((n) => (
                            <Announcement
                                key={n.title}
                                meta={n.meta}
                                title={n.title}
                                body={n.body}
                                pinned={n.pinned}
                            />
                        ))}
                    </Stack>
                }
                side={
                    <Card component="aside" sx={{ p: 2.25, gap: 1.5 }}>
                        <Typography variant="h5" component="h2">
                            Coming up
                        </Typography>
                        {EVENTS.map((e) => (
                            <Stack
                                key={e.title}
                                direction="row"
                                sx={{ alignItems: "center", gap: 1.5 }}
                            >
                                <DateTile month={e.month} day={e.day} />
                                <Stack sx={{ gap: 0.25, minWidth: 0 }}>
                                    <Typography
                                        sx={{ fontWeight: "fontWeightSemiBold" }}
                                    >
                                        {e.title}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {e.detail}
                                    </Typography>
                                </Stack>
                            </Stack>
                        ))}
                    </Card>
                }
            />
        </>
    )
}
