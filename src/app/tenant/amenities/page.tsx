import type { Metadata } from "next"
import { PageHeader } from "@/components/ui"
import AmenityBooking from "./AmenityBooking"

export const metadata: Metadata = { title: "Book an amenity" }

// Placeholder data until the Supabase tables exist.
const BOOKING_ACCESS_UNTIL = "Jul 31, 2027"

export default function TenantAmenities() {
    return (
        <>
            <PageHeader
                title="Book an amenity"
                description={`Your landlord turned on booking for you through ${BOOKING_ACCESS_UNTIL}.`}
            />
            <AmenityBooking />
        </>
    )
}
