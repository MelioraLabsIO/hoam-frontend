"use client"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { KeyValue, Pill, type Tone } from "@/components/ui"

export type AmenityRule = {
    name: string
    status: string
    tone: Tone
    capacity: string
    max: string
    deposit: string
}

/** Grid of booking-rule cards, one per amenity. */
export default function AmenityRules({ rules }: { rules: AmenityRule[] }) {
    return (
        <Box
            sx={(theme) => ({
                display: "grid",
                gridTemplateColumns: `repeat(auto-fit, minmax(min(${theme.layout.grid.methods}px, 100%), 1fr))`,
                gap: 2,
            })}
        >
            {rules.map((r) => (
                <Card
                    component="section"
                    key={r.name}
                    sx={{ p: 2.25, gap: 1.25 }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1,
                        }}
                    >
                        <Typography variant="h5" component="h2">
                            {r.name}
                        </Typography>
                        <Pill tone={r.tone}>{r.status}</Pill>
                    </Stack>
                    <Stack sx={{ gap: 0.75 }}>
                        <KeyValue label="Capacity" value={r.capacity} />
                        <KeyValue label="Max per booking" value={r.max} />
                        <KeyValue label="Deposit" value={r.deposit} />
                    </Stack>
                    <Link
                        component="button"
                        type="button"
                        variant="label"
                        aria-label={`Edit rules for ${r.name}`}
                        sx={{ alignSelf: "flex-start" }}
                    >
                        Edit rules
                    </Link>
                </Card>
            ))}
        </Box>
    )
}
