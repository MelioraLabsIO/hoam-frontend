import Typography from "@mui/material/Typography"
import type { Metadata } from "next"
import RequestsBoard from "./RequestsBoard"

export const metadata: Metadata = { title: "Requests" }

export default function OwnerRequests() {
    return (
        <>
            <Typography variant="h1">Requests</Typography>
            <RequestsBoard />
        </>
    )
}
