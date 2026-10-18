import type { Metadata } from "next"
import Card from "@mui/material/Card"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { AutoGrid, ListRow, PageHeader } from "@/components/ui"
import PdfBadge from "./PdfBadge"

export const metadata: Metadata = { title: "Community rules" }

// Placeholder data until the Supabase tables exist.
const SUMMARIES = [
    {
        title: "Parking",
        body: "Park in your driveway or garage. Street parking for guests only, no overnight. Boats and trailers need a storage permit.",
    },
    {
        title: "Trash & recycling",
        body: "Bins out after 6 PM the night before pickup, back out of sight by the end of pickup day.",
    },
    {
        title: "Quiet hours",
        body: "10 PM to 7 AM, every day. Clubhouse events end by 10 PM.",
    },
    {
        title: "Pets",
        body: "Leashed in common areas, waste picked up. Register dogs and cats in My household.",
    },
]

const DOCUMENTS = [
    { name: "Rules and regulations", updated: "Jan 18, 2026", href: "#" },
    { name: "Pool and clubhouse rules", updated: "May 2, 2026", href: "#" },
    { name: "Parking and vehicle policy", updated: "Mar 9, 2025", href: "#" },
    { name: "New resident welcome guide", updated: "Aug 1, 2026", href: "#" },
]

export default function TenantRules() {
    return (
        <>
            <PageHeader
                title="Community rules"
                description="The rules that apply to everyone who lives here. A quick summary, with the full versions below."
            />

            <AutoGrid kind="stats">
                {SUMMARIES.map((s) => (
                    <Card
                        key={s.title}
                        component="section"
                        sx={{ p: 2.25, gap: 1 }}
                    >
                        <Typography variant="h5" component="h2">
                            {s.title}
                        </Typography>
                        <Typography
                            variant="lead"
                            color="text.secondary"
                            sx={{ lineHeight: 1.5 }}
                        >
                            {s.body}
                        </Typography>
                    </Card>
                ))}
            </AutoGrid>

            <Card
                component="section"
                aria-label="Full rule documents"
                sx={{ py: 1, px: 2.5, gap: 0 }}
            >
                {DOCUMENTS.map((d) => (
                    <ListRow key={d.name} sx={{ py: 1.75 }}>
                        <PdfBadge />
                        <Stack sx={{ flex: "1 1 auto", minWidth: 0, gap: 0.25 }}>
                            <Typography
                                sx={{ fontWeight: "fontWeightSemiBold" }}
                            >
                                {d.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Updated {d.updated}
                            </Typography>
                        </Stack>
                        <Link
                            href={d.href}
                            variant="label"
                            aria-label={`Download ${d.name} (PDF)`}
                        >
                            Download
                        </Link>
                    </ListRow>
                ))}
            </Card>
        </>
    )
}
