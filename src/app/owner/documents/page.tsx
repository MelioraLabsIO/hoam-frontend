import Typography from "@mui/material/Typography"
import type { Metadata } from "next"
import DocumentLibrary from "./DocumentLibrary"

export const metadata: Metadata = { title: "Documents" }

export default function OwnerDocuments() {
    return (
        <>
            <Typography variant="h1">Documents</Typography>
            <DocumentLibrary />
        </>
    )
}
