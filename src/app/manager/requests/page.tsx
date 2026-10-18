import type { Metadata } from "next"
import RequestsBoard from "./RequestsBoard"

export const metadata: Metadata = { title: "Requests" }

export default function ManagerRequests() {
    return <RequestsBoard />
}
