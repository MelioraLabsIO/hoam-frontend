import type { Metadata } from "next"
import AmenitiesCalendar from "./AmenitiesCalendar"
import AmenityRules, { type AmenityRule } from "./AmenityRules"

export const metadata: Metadata = { title: "Amenities" }

// Placeholder data until the Supabase tables exist.
const RULES: AmenityRule[] = [
    {
        name: "Clubhouse",
        status: "Open",
        tone: "blue",
        capacity: "40 guests",
        max: "4 hours",
        deposit: "$100",
    },
    {
        name: "Tennis courts",
        status: "Open",
        tone: "blue",
        capacity: "2 courts",
        max: "2 hours",
        deposit: "None",
    },
    {
        name: "Pickleball",
        status: "Open",
        tone: "blue",
        capacity: "4 courts",
        max: "2 hours",
        deposit: "None",
    },
    {
        name: "Pool",
        status: "Closed to Nov 4",
        tone: "amber",
        capacity: "60 swimmers",
        max: "No booking",
        deposit: "None",
    },
]

export default function ManagerAmenities() {
    return (
        <>
            <AmenitiesCalendar />

            <AmenityRules rules={RULES} />
        </>
    )
}
