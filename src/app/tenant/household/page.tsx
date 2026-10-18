import type { Metadata } from "next"
import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { AutoGrid, KeyValue, TextLink } from "@/components/ui"
import HouseholdLists from "./HouseholdLists"

export const metadata: Metadata = { title: "My household" }

// Placeholder data until the Supabase tables exist.
const LEASE = {
    home: "9 Heron Way",
    term: "Aug 1, 2025 – Jul 31, 2027",
    landlord: "Dana Ortega",
    landlordFirst: "Dana",
}

export default function TenantHousehold() {
    return (
        <>
            <Typography variant="h1">My household</Typography>

            <AutoGrid kind="cards" sx={{ alignItems: "start" }}>
                <Card component="section" sx={{ gap: 1.5 }}>
                    <Typography variant="h4" component="h2">
                        Lease
                    </Typography>
                    <Stack sx={{ gap: 1 }}>
                        <KeyValue label="Home" value={LEASE.home} />
                        <KeyValue label="Lease" value={LEASE.term} />
                        <KeyValue label="Landlord" value={LEASE.landlord} />
                    </Stack>
                    <TextLink href="#">Message your landlord</TextLink>
                    <Typography variant="caption" color="text.secondary">
                        Only your landlord can change lease details.
                    </Typography>
                </Card>

                <HouseholdLists landlordFirst={LEASE.landlordFirst} />
            </AutoGrid>
        </>
    )
}
