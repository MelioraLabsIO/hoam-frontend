import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { Metadata } from "next"
import { ListRow, PageHeader, Pill, Split } from "@/components/ui"
import NoticeActions, { DeadlineBand, PhotoPlaceholder } from "./NoticeActions"

export const metadata: Metadata = { title: "Violations" }

// Placeholder data until the Supabase tables exist.
const OPEN_NOTICE = {
    home: "14 Willow Bend Ct",
    sent: "Oct 9",
    status: "Open · courtesy notice",
    title: "Trash bins visible from the street",
    body: "CC&Rs §7.3 asks that bins be stored out of view from the street except on pickup days. Please move them behind the side gate or into the garage.",
    resolveBy: "Oct 23",
    daysLeft: 8,
}

const STEPS = [
    { label: "Courtesy notice", current: true },
    { label: "Second notice after Oct 23" },
    { label: "$50 fine after 14 more days" },
    { label: "Hearing with the board" },
]

const CLOSED = [
    { title: "Lawn height over 6 inches", detail: "9 Heron Way · fixed Jun 5" },
    {
        title: "Holiday lights up past Feb 1",
        detail: "14 Willow Bend Ct · fixed Feb 6",
    },
]

export default function OwnerViolations() {
    const n = OPEN_NOTICE
    return (
        <>
            <PageHeader
                title="Violations"
                description="Notices for your rented home come to you, not your tenant. You can forward one to them from the notice."
            />

            <Split
                main={
                    <Card
                        component="section"
                        variant="attention"
                        sx={{ p: 2.75, gap: 2 }}
                    >
                        <Stack
                            direction="row"
                            sx={{
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 1,
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontWeight: "fontWeightSemiBold" }}
                            >
                                {n.home} · Notice sent {n.sent}
                            </Typography>
                            <Pill tone="amber">
                                <Typography
                                    variant="inherit"
                                    component="span"
                                    sx={{ fontWeight: "fontWeightBold" }}
                                >
                                    {n.status}
                                </Typography>
                            </Pill>
                        </Stack>
                        <Typography variant="h3" component="h2">
                            {n.title}
                        </Typography>
                        <Typography
                            variant="lead"
                            component="p"
                            color="text.secondary"
                            sx={{ lineHeight: 1.5 }}
                        >
                            {n.body}
                        </Typography>
                        <PhotoPlaceholder sent={n.sent} />
                        <DeadlineBand
                            deadline={`Resolve by ${n.resolveBy} · ${n.daysLeft} days left`}
                            note="No fine if it's fixed by then"
                        />
                        <NoticeActions />
                    </Card>
                }
                side={
                    <Stack component="aside" sx={{ gap: 2 }}>
                        <Card component="section" sx={{ p: 2.25, gap: 1.5 }}>
                            <Typography variant="h5" component="h2">
                                What happens next
                            </Typography>
                            <Stack
                                component="ol"
                                sx={{ m: 0, p: 0, pl: 2.5, gap: 1 }}
                            >
                                {STEPS.map((s) =>
                                    s.current ? (
                                        <Typography
                                            key={s.label}
                                            component="li"
                                            variant="body2"
                                            aria-current="step"
                                        >
                                            <Typography
                                                component="strong"
                                                variant="inherit"
                                                sx={{ fontWeight: "fontWeightBold" }}
                                            >
                                                {s.label}
                                            </Typography>{" "}
                                            — you are here
                                        </Typography>
                                    ) : (
                                        <Typography
                                            key={s.label}
                                            component="li"
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {s.label}
                                        </Typography>
                                    )
                                )}
                            </Stack>
                        </Card>
                        <Card component="section" sx={{ p: 2.25, gap: 0 }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{ mb: 0.5 }}
                            >
                                Closed
                            </Typography>
                            {CLOSED.map((c) => (
                                <ListRow
                                    key={c.title}
                                    sx={{
                                        flexDirection: "column",
                                        alignItems: "stretch",
                                        gap: 0.25,
                                        py: 1.25,
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{ fontWeight: "fontWeightSemiBold" }}
                                    >
                                        {c.title}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {c.detail}
                                    </Typography>
                                </ListRow>
                            ))}
                        </Card>
                    </Stack>
                }
            />
        </>
    )
}
