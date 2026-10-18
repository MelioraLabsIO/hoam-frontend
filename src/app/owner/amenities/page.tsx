import Card from "@mui/material/Card"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { Metadata } from "next"
import { Split, Tile } from "@/components/ui"
import BookingPicker from "./BookingPicker"

export const metadata: Metadata = { title: "Book an amenity" }

// Placeholder data until the Supabase tables exist.
const MY_BOOKINGS = [
    { title: "Clubhouse · Book club", when: "Sun, Oct 18 · 2–4 PM" },
]

export default function OwnerAmenities() {
    return (
        <>
            <Typography variant="h1">Book an amenity</Typography>

            <Split
                main={<BookingPicker />}
                side={
                    <Stack component="aside" sx={{ gap: 2 }}>
                        <Card component="section" sx={{ p: 2.25, gap: 1.5 }}>
                            <Typography variant="h5" component="h2">
                                My bookings
                            </Typography>
                            {MY_BOOKINGS.map((b) => (
                                <Tile
                                    key={b.title + b.when}
                                    sx={{
                                        bgcolor: "blue.soft",
                                        color: "blue.softContrast",
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{ fontWeight: "fontWeightSemiBold" }}
                                    >
                                        {b.title}
                                    </Typography>
                                    <Typography variant="caption">
                                        {b.when}
                                    </Typography>
                                </Tile>
                            ))}
                            <Link href="#" variant="label">
                                Past bookings
                            </Link>
                        </Card>
                        <Card component="section" sx={{ p: 2.25, gap: 1 }}>
                            <Typography variant="h5" component="h2">
                                Your tenant
                            </Typography>
                            <Typography
                                variant="body2"
                                component="span"
                                color="text.secondary"
                            >
                                Jordan Lee at 9 Heron Way can book amenities.
                                Their bookings count toward that home&apos;s
                                limits.
                            </Typography>
                            <Link href="/owner/homes" variant="label">
                                Change tenant access
                            </Link>
                        </Card>
                    </Stack>
                }
            />
        </>
    )
}
