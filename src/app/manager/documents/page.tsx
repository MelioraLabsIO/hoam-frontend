import type { Metadata } from "next"
import Button from "@mui/material/Button"
import { PageHeader } from "@/components/ui"
import DocumentsLibrary from "./DocumentsLibrary"

export const metadata: Metadata = { title: "Documents" }

export default function ManagerDocuments() {
    return (
        <>
            <PageHeader
                eyebrow="Shared with residents unless marked board only"
                title="Documents"
                actions={
                    <>
                        <Button>New folder</Button>
                        <Button variant="contained">Upload</Button>
                    </>
                }
            />
            <DocumentsLibrary />
        </>
    )
}
