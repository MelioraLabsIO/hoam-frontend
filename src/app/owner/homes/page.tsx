import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { Metadata } from "next"
import { ListRow, PageHeader, Pill } from "@/components/ui"
import TenantAccess, { HomeCard, HomeHeader } from "./TenantAccess"

export const metadata: Metadata = { title: "My homes & tenants" }

// Placeholder data until the Supabase tables exist.
const HOUSEHOLD = [
    { name: "Dana Ortega", role: "Owner · primary contact" },
    { name: "Luis Ortega", role: "Co-owner" },
]

export default function OwnerHomes() {
    return (
        <>
            <PageHeader
                title="My homes & tenants"
                actions={<Button variant="contained">Invite a tenant</Button>}
            />

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    alignItems: "flex-start",
                }}
            >
                <HomeCard>
                    <HomeHeader
                        address="14 Willow Bend Ct"
                        detail="Lot 31 · single-family"
                        pill={
                            <Pill tone="blue">
                                <Typography
                                    variant="inherit"
                                    component="span"
                                    sx={{ fontWeight: "fontWeightBold" }}
                                >
                                    You live here
                                </Typography>
                            </Pill>
                        }
                    />
                    <Stack sx={{ gap: 0.5 }}>
                        <Typography
                            variant="body2"
                            component="h3"
                            sx={{ fontWeight: "fontWeightSemiBold" }}
                        >
                            Household
                        </Typography>
                        <Box>
                            {HOUSEHOLD.map((m) => (
                                <ListRow
                                    key={m.name}
                                    sx={{ justifyContent: "space-between", py: 1.25 }}
                                >
                                    <Typography component="span">{m.name}</Typography>
                                    <Typography component="span" color="text.secondary">
                                        {m.role}
                                    </Typography>
                                </ListRow>
                            ))}
                        </Box>
                    </Stack>
                    <Link href="#" variant="label">
                        Add a household member
                    </Link>
                </HomeCard>

                <TenantAccess />
            </Box>
        </>
    )
}
