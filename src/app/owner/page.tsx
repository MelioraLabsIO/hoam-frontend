import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { Metadata } from "next"
import NextLinkComposed from "@/theme/NextLinkComposed"
import {
    Announcement,
    DateTile,
    Pill,
    Split,
    Tile,
    AutoGrid,
    type Tone,
} from "@/components/ui"

export const metadata: Metadata = { title: "Home" }

// Placeholder data until the Supabase tables exist.
const ANNOUNCEMENTS: {
    meta: string
    title: string
    body?: string
    pinned?: boolean
    tag?: { label: string; tone: Tone }
}[] = [
    {
        meta: "From the board · Oct 12",
        title: "Pool resurfacing starts Oct 21 — closed for two weeks",
        body: "The clubhouse stays open. Gate codes reset on reopening; new codes will be posted here.",
        pinned: true,
    },
    {
        meta: "Board · Oct 14",
        title: "Proxy forms due before the annual meeting",
        body: "Can't attend on Nov 12? Assign a proxy so your vote still counts.",
        tag: { label: "Owners only", tone: "blue" },
    },
    { meta: "Management · Oct 10", title: "Leaf pickup moves to Thursdays" },
]

const HOMES = [
    { address: "14 Willow Bend Ct", note: "You live here" },
    {
        address: "9 Heron Way",
        note: "Rented to Jordan Lee · lease ends Jul 2027",
    },
]

// Tile is typed as a Box; spread so it can render as a link.
const HOME_LINK = { component: NextLinkComposed, href: "/owner/homes" }

const EVENTS = [
    {
        month: "Oct",
        day: 24,
        title: "Board meeting",
        detail: "7:00 PM · Clubhouse",
    },
    {
        month: "Nov",
        day: 12,
        title: "Annual owners meeting",
        detail: "6:30 PM · Clubhouse",
    },
]

export default function OwnerHome() {
    return (
        <>
            <Typography variant="h1">Good afternoon, Dana</Typography>

            <AutoGrid kind="cards">
                <Card variant="hero">
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 1.5,
                        }}
                    >
                        <Stack sx={{ gap: 0.5 }}>
                            <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                    fontWeight: "fontWeightMedium",
                                    opacity: 0.85,
                                }}
                            >
                                Due across your 2 homes
                            </Typography>
                            <Typography variant="h1" component="span">
                                $570.00
                            </Typography>
                        </Stack>
                        <Pill tone="amber" large>
                            Due Nov 1
                        </Pill>
                    </Stack>
                    <Button variant="contained" color="inverse" href="/owner/dues">
                        Review and pay
                    </Button>
                </Card>

                <Card variant="attention" sx={{ gap: 1.25 }}>
                    <Typography
                        variant="caption"
                        color="amber.dark"
                        sx={{ fontWeight: "fontWeightBold" }}
                    >
                        Needs your response
                    </Typography>
                    <Typography variant="h6" component="span">
                        Trash bins visible from the street · 14 Willow Bend Ct
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Resolve by Oct 23
                    </Typography>
                    <Link href="/owner/violations" sx={{ mt: "auto" }}>
                        Open notice
                    </Link>
                </Card>

                <Card sx={{ gap: 1.25 }}>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: "fontWeightBold" }}
                    >
                        Annual meeting · Nov 12
                    </Typography>
                    <Typography variant="h6" component="span">
                        Vote on the 2027 budget and two board seats
                    </Typography>
                    <Stack
                        direction="row"
                        sx={{
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 1.25,
                            mt: "auto",
                        }}
                    >
                        <Button variant="contained" sx={{ flex: 1 }}>
                            Cast vote
                        </Button>
                        <Button sx={{ flex: 1 }}>Assign proxy</Button>
                    </Stack>
                </Card>
            </AutoGrid>

            <Split
                main={
                    <Stack component="section" sx={{ gap: 1.5 }}>
                        <Typography variant="h3" component="h2">
                            Announcements
                        </Typography>
                        {ANNOUNCEMENTS.map((a) => (
                            <Announcement key={a.title} {...a} />
                        ))}
                    </Stack>
                }
                side={
                    <Stack component="aside" sx={{ gap: 2 }}>
                        <Card component="section" sx={{ p: 2.25, gap: 1.5 }}>
                            <Typography variant="h5" component="h2">
                                Your homes
                            </Typography>
                            {HOMES.map((h) => (
                                <Tile
                                    key={h.address}
                                    {...HOME_LINK}
                                    sx={{ textDecoration: "none" }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{ fontWeight: "fontWeightSemiBold" }}
                                    >
                                        {h.address}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {h.note}
                                    </Typography>
                                </Tile>
                            ))}
                        </Card>
                        <Card component="section" sx={{ p: 2.25, gap: 1.5 }}>
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
                                    <Stack sx={{ gap: 0.25 }}>
                                        <Typography
                                            component="span"
                                            sx={{
                                                fontWeight: "fontWeightSemiBold",
                                            }}
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
                    </Stack>
                }
            />
        </>
    )
}
