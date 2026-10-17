import type { Metadata } from "next"
import { PageHeader } from "@/components/ui"
import AnnouncementsBoard from "./AnnouncementsBoard"

export const metadata: Metadata = { title: "Announcements" }

export default function ManagerAnnouncements() {
    return (
        <>
            <PageHeader
                eyebrow="Posts go to the resident app, plus push and email if you choose"
                title="Announcements"
            />
            <AnnouncementsBoard />
        </>
    )
}
