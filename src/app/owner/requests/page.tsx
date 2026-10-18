import type { Metadata } from "next"
import RequestsBoard from "./RequestsBoard"

export const metadata: Metadata = { title: "Requests" }

export default function OwnerRequests() {
    return (
        <>
            <h1 className="h1">Requests</h1>
            <RequestsBoard />
        </>
    )
}
