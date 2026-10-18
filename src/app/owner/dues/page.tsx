import type { Metadata } from "next"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import DuesPayment, { type Payment, PaymentHistory } from "./DuesPayment"

export const metadata: Metadata = { title: "Dues & payments" }

// Placeholder data until the Supabase tables exist.
const HISTORY: Payment[] = [
    {
        date: "Jul 28",
        home: "14 Willow Bend Ct",
        description: "Q3 assessment",
        amount: "$285.00",
    },
    {
        date: "Jul 28",
        home: "9 Heron Way",
        description: "Q3 assessment",
        amount: "$285.00",
    },
    {
        date: "Apr 30",
        home: "Both homes",
        description: "Q2 assessment",
        amount: "$570.00",
    },
    {
        date: "Feb 15",
        home: "14 Willow Bend Ct",
        description: "Late fee · waived by board",
        amount: "$25.00",
        waived: true,
    },
]

export default function OwnerDues() {
    return (
        <>
            <Typography variant="h1">Dues &amp; payments</Typography>

            <DuesPayment />

            <Card component="section" sx={{ gap: 0.5, pt: 2.75 }}>
                <Typography variant="h4" component="h2">
                    Payment history
                </Typography>
                <PaymentHistory rows={HISTORY} />
            </Card>
        </>
    )
}
